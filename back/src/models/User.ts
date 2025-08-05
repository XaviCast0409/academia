import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number; // Relación con Role
  pokemonId: number; // <-- NUEVO
  xavicoints?: number; // Xavicoints del usuario
  section?: string;
  level?: number;
  experience?: number;
  isActive?: boolean;
  currentStreak?: number; // Racha actual de días consecutivos
  lastLogin?: Date; // Última fecha de login
  completedActivities?: number; // Número de actividades completadas
  isVerified?: boolean; // Si el usuario está verificado
  verificationCode?: string; // Código de verificación
  verificationCodeExpires?: Date; // Fecha de expiración del código
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> { }
export interface UserOutput extends Required<UserAttributes> { }

export class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public pokemonId!: number; // <-- NUEVO
  public xavicoints!: number; // Xavicoints del usuario
  public section?: string;
  public level?: number;
  public experience?: number;
  public isActive?: boolean;
  public currentStreak?: number;
  public lastLogin?: Date;
  public completedActivities?: number;
  public isVerified?: boolean;
  public verificationCode?: string;
  public verificationCodeExpires?: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    // Relación existente con Role
    User.belongsTo(db.Role, {
      foreignKey: "roleId",
      as: "role",
    });

    // Relación con Product (un profesor puede tener muchos productos)
    User.hasMany(db.Product, {
      foreignKey: "professorId",
      as: "products",
    });

    // Relación con Activity (un profesor puede crear muchas actividades)
    User.hasMany(db.Activity, {
      foreignKey: "professorId",
      as: "activities",
    });

    // Relación con Evidence (un alumno puede subir muchas evidencias)
    User.hasMany(db.Evidence, {
      foreignKey: "studentId",
      as: "evidences",
    });

    // Relación con Transaction (un usuario puede tener muchas transacciones)
    User.hasMany(db.Transaction, {
      foreignKey: "userId",
      as: "transactions",
    });

    // Relación con Pokemon
    User.belongsTo(db.Pokemon, {
      foreignKey: "pokemonId",
      as: "pokemon",
    });

    // Relación con UserAchievement (un usuario puede tener muchos logros)
    User.hasMany(db.UserAchievement, {
      foreignKey: "userId",
      as: "userAchievements",
    });

    // Relación con UserMission (un usuario puede tener muchas misiones)
    User.hasMany(db.UserMission, {
      foreignKey: "userId",
      as: "userMissions",
    });
  }

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        roleId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "roles", // Nombre de la tabla relacionada
            key: "id",
          },
        },
        pokemonId: {
          type: DataTypes.INTEGER,
          allowNull: true, // Relación opcional con Pokémon
          references: {
            model: "pokemons", // Nombre de la tabla relacionada
            key: "id",
          },
        },
        xavicoints: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0, // Valor por defecto para xavicoints
        },
        section: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "default", // Valor por defecto para la sección
        },
        level: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 1, // Valor por defecto para el nivel
        },
        experience: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0, // Valor por defecto para la experiencia
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: true, // Valor por defecto para el estado activo
        },
        currentStreak: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0, // Valor por defecto para la racha
        },
        lastLogin: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        completedActivities: {
          type: DataTypes.INTEGER,
          allowNull: true,
          defaultValue: 0, // Valor por defecto para actividades completadas
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false, // Valor por defecto para verificación
        },
        verificationCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        verificationCodeExpires: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      }
    );
  }
}

export default User;