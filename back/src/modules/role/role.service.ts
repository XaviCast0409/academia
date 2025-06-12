import db from "../../config/database";
import { RoleOutput } from "../../models/Role";

export const getRole = async (id: number): Promise<RoleOutput> => {
  const role = await db.Role.findByPk(id);
  return role;
};

export const getRoles = async (): Promise<RoleOutput[]> => {
  const roles = await db.Role.findAll();
  return roles;
};

export const createRole = async (name: string): Promise<RoleOutput> => {
  if (!name) {
    throw new Error("Name is required.");
  }

  const findRole = await db.Role.findOne({ where: { name } });

  if (findRole) {
    throw new Error("Role already exists.");
  }

  const role = await db.Role.create({ name });
  return role;
};

export const updateRole = async (id: number, name: string): Promise<RoleOutput> => {
  if (!name) {
    throw new Error("Name is required.");
  }

  const role = await db.Role.update({ name }, { where: { id } });
  return role;
};

export const deleteRole = async (id: number): Promise<number> => {
  const role = await db.Role.destroy({ where: { id } });
  return role;
};
