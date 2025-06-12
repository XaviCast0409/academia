import db from "../../config/database";
import { encrypt, generateToken, verified } from "../../utils/validations";
import { UserOutput } from "../../models/User";

export const getUser = async (id: number): Promise<UserOutput> => {
  try {
    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Role, as: "role" },
        { model: db.Pokemon, as: "pokemon" }
      ],
    });
    return user;
  } catch (error) {
    throw new Error("User not found");
  }
};


export const getUsers = async (): Promise<UserOutput[]> => {
  const users = await db.User.findAll({ include: db.Role });
  return users;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  roleId: number,
  pokemonId: number // opcional si no se requiere al crear
): Promise<UserOutput> => {
  const findUser = await db.User.findOne({ where: { email } });
  if (findUser) {
    throw new Error("User already exists");
  }

  password = await encrypt(password);
  const user = await db.User.create(
    { name, email, password, roleId, pokemonId }
  );
  return user;
};

export const updateUser = async (
  id: number,
  name: string,
  email: string,
  password: string,
  roleId: number
): Promise<UserOutput> => {
  password = await encrypt(password);
  const user = await db.User.update(
    { name, email, password, roleId },
    { where: { id }, include: db.Role }
  );
  return user;
};

export const deleteUser = async (id: number): Promise<number> => {
  const user = await db.User.destroy({ where: { id } });
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: any }> => {
  const user = await db.User.findOne({ 
    where: { email },
    include: [
      { model: db.Role, as: "role" },
      { model: db.Pokemon, as: "pokemon" }
    ]
  });
  if (!user) {
    throw new Error("User not found");
  }

  const isCorrect = await verified(password, user.password);
  if (!isCorrect) {
    throw new Error("Incorrect password");
  }

  const token = generateToken(user.id, user.roleId, user.role.id); // ahora pasas el roleId también
  return { token, user: user.toJSON() }; // Devuelve el token y el usuario como JSON
};
