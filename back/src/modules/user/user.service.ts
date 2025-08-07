import db from "../../config/database";
import { encrypt, generateToken, verified } from "../../utils/validations";
import { UserOutput, UserInput } from "../../models/User";
import { UserNotFoundError, UserAlreadyExistsError } from "../../utils/error";
import { assignActiveMissionsToUser } from '../mission/mission.service';

export const getUser = async (id: number): Promise<UserOutput> => {
  try {
    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Role, as: "role" },
        { model: db.Pokemon, as: "pokemon" }
      ],
    });
    
    // Verificar que el usuario existe
    if (!user) {
      throw new UserNotFoundError(`User with id ${id} not found`);
    }
    
    return user;
  } catch (error) {
    throw new UserNotFoundError(`User with id ${id} not found`);
  }
};

export const getUsers = async (
  page: number = 1,
  limit: number = 20,
  section?: string,
  isActive?: boolean,
  search?: string
): Promise<{ users: UserOutput[]; total: number; totalPages: number; currentPage: number }> => {
  try {
    // Construir where clause
    const whereClause: any = {};
    
    if (section && section.trim() !== '') {
      whereClause.section = section;
    }
    
    if (isActive !== undefined && isActive !== null) {
      whereClause.isActive = isActive;
    }
    
    if (search && search.trim() !== '') {
      whereClause[db.Sequelize.Op.or] = [
        { name: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { email: { [db.Sequelize.Op.iLike]: `%${search}%` } },
        { section: { [db.Sequelize.Op.iLike]: `%${search}%` } }
      ];
    }

    // Obtener total de usuarios
    const total = await db.User.count({ where: whereClause });

    // Calcular offset
    const offset = (page - 1) * limit;

    // Obtener usuarios con paginación
    const users = await db.User.findAll({
      where: whereClause,
      include: [
        { model: db.Role, as: "role" },
        { model: db.Pokemon, as: "pokemon" }
      ],
      order: [["createdAt", "DESC"]],
      limit,
      offset
    });

    const totalPages = Math.ceil(total / limit);

    return {
      users,
      total,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  roleId: number,
  pokemonId: number,
  section?: string
): Promise<UserOutput> => {
  // Verificar si el usuario ya existe
  const findUser = await db.User.findOne({ where: { email } });
  if (findUser) {
    throw new UserAlreadyExistsError(`User with email ${email} already exists`);
  }

  // Encriptar contraseña
  const encryptedPassword = await encrypt(password);
  
  // Crear usuario con TODOS los campos del modelo inicializados correctamente
  const userData = {
    // Campos obligatorios
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: encryptedPassword,
    roleId,
    pokemonId,
    
    // Campos con valores por defecto según el modelo
    section: section?.trim() || "default",
    level: 1,
    experience: 0,
    xavicoints: 0,
    currentStreak: 0,
    lastLogin: null,
    completedActivities: 0,
    isActive: true,
    isVerified: false,
    verificationCode: null,
    verificationCodeExpires: null,
  };
  
  const user = await db.User.create(userData);

  // Asignar logros automáticamente al nuevo usuario
  try {
    const { assignAllAchievementsToUser } = await import("../achievement/achievement.service");
    await assignAllAchievementsToUser(user.id);
  } catch (error) {
    console.error("Error asignando logros al nuevo usuario:", error);
  }

  // Asignar misiones automáticamente al nuevo usuario
  try {
    await assignActiveMissionsToUser(user.id);
  } catch (error) {
    console.error("Error asignando misiones al nuevo usuario:", error);
  }

  return user;
};

export const updateUser = async (
  id: number,
  userData: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw new UserNotFoundError(`User with id ${id} not found`);
  }

  if (userData.password) {
    userData.password = await encrypt(userData.password);
  }

  await user.update(userData);
  return user;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await db.User.destroy({ where: { id } });
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: UserOutput }> => {
  const user = await db.User.findOne({ 
    where: { email },
    include: [
      { model: db.Role, as: "role" },
      { model: db.Pokemon, as: "pokemon" }
    ]
  });
  
  if (!user) {
    throw new UserNotFoundError("Invalid credentials");
  }

  const isPasswordValid = await verified(password, user.password);
  if (!isPasswordValid) {
    throw new UserNotFoundError("Invalid credentials");
  }

  // Actualizar streak automáticamente al hacer login
  try {
    await updateUserStreak(user.id);
  } catch (error) {
    console.error("Error actualizando streak en login:", error);
  }

  const token = generateToken(user.id, user.roleId, user.roleId);
  return { token, user };
};

/**
 * Obtener estadísticas completas del usuario
 */
export const getUserStats = async (userId: number): Promise<any> => {
  try {
    const user = await db.User.findByPk(userId, {
      include: [
        { model: db.Role, as: "role" },
        { model: db.Pokemon, as: "pokemon" },
        { 
          model: db.UserAchievement, 
          as: "userAchievements",
          include: [{ model: db.Achievement, as: "achievement" }]
        },
        { 
          model: db.UserMission, 
          as: "userMissions",
          include: [{ model: db.Mission, as: "mission" }]
        }
      ]
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Calcular estadísticas de logros
    const unlockedAchievements = user.userAchievements?.filter((ua: any) => ua.isUnlocked) || [];
    const claimedAchievements = user.userAchievements?.filter((ua: any) => ua.rewardClaimed) || [];
    const pendingClaimAchievements = user.userAchievements?.filter((ua: any) => ua.isUnlocked && !ua.rewardClaimed) || [];

    // Calcular estadísticas de misiones
    const completedMissions = user.userMissions?.filter((um: any) => um.isCompleted) || [];
    const activeMissions = user.userMissions?.filter((um: any) => !um.isCompleted) || [];

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        level: user.level,
        experience: user.experience,
        xavicoints: user.xavicoints,
        section: user.section,
        currentStreak: user.currentStreak,
        completedActivities: user.completedActivities,
        lastLogin: user.lastLogin,
        isVerified: user.isVerified,
        role: user.role,
        pokemon: user.pokemon
      },
      achievements: {
        total: user.userAchievements?.length || 0,
        unlocked: unlockedAchievements.length,
        claimed: claimedAchievements.length,
        pendingClaim: pendingClaimAchievements.length
      },
      missions: {
        total: user.userMissions?.length || 0,
        completed: completedMissions.length,
        active: activeMissions.length
      }
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar XaviCoins del usuario
 */
export const updateUserXaviCoins = async (userId: number, amount: number, operation: 'add' | 'subtract' = 'add'): Promise<any> => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const currentCoins = user.xavicoints || 0;
    let newCoins: number;

    if (operation === 'add') {
      newCoins = currentCoins + amount;
    } else {
      newCoins = Math.max(0, currentCoins - amount); // No permitir valores negativos
    }

    user.xavicoints = newCoins;
    await user.save();

    // Actualizar logros automáticamente si se agregaron monedas
    if (operation === 'add' && amount > 0) {
      try {
        const { updateProgressFromCoins } = await import("../achievement/achievementProgress.service");
        await updateProgressFromCoins(userId, newCoins);
      } catch (error) {
        console.error("Error actualizando logros por XaviCoins:", error);
      }
    }

    return {
      success: true,
      previousCoins: currentCoins,
      newCoins: newCoins,
      change: operation === 'add' ? amount : -amount
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Actualizar streak del usuario y verificar logros
 */
export const updateUserStreak = async (userId: number): Promise<any> => {
  try {
    const user = await db.User.findByPk(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const now = new Date();
    const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Si es la primera vez que inicia sesión hoy
    if (!lastLogin || lastLogin < today) {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Si el último login fue ayer, incrementar streak
      if (lastLogin && lastLogin >= yesterday) {
        user.currentStreak = (user.currentStreak || 0) + 1;
      } else {
        // Si no fue ayer, reiniciar streak
        user.currentStreak = 1;
      }

      // Actualizar último login
      user.lastLogin = now;
      await user.save();

      // Actualizar logros automáticamente
      const { updateProgressFromStreak } = await import("../achievement/achievementProgress.service");
      
      await updateProgressFromStreak(userId, user.currentStreak);

      return {
        success: true,
        currentStreak: user.currentStreak,
        lastLogin: user.lastLogin
      };
    }

    return {
      success: true,
      currentStreak: user.currentStreak,
      lastLogin: user.lastLogin,
      message: "Ya has iniciado sesión hoy"
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Asignar misiones activas al usuario
 */
export const assignMissionsToUser = async (userId: number): Promise<any> => {
  try {
    await assignActiveMissionsToUser(userId);
    return {
      success: true,
      message: "Misiones asignadas correctamente"
    };
  } catch (error) {
    throw error;
  }
};
