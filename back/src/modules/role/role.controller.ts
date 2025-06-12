import { Request, Response } from "express";
import {
  getRole,
  getRoles,
  createRole,
  updateRole,
  deleteRole,
} from "./role.service";
import { RoleInput } from "../../models/Role";
import { errorHelper } from "../../utils/error";

export const getRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await getRole(parseInt(id));
    res.status(200).json(role);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getRolesController = async (_req: Request, res: Response) => {
  try {
    const roles = await getRoles();
    res.status(200).json(roles); // Cambié el código a 200.
  } catch (error) {
    errorHelper(error, res);
  }
};

export const createRoleController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body as RoleInput;
    const role = await createRole(name);
    res.status(201).json(role);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const updateRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body as RoleInput;
    const role = await updateRole(parseInt(id), name);
    res.status(200).json(role); // Cambié el código a 200.
  } catch (error) {
    errorHelper(error, res);
  }
};

export const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await deleteRole(parseInt(id));
    res.status(200).json(role); // Cambié el código a 200.
  } catch (error) {
    errorHelper(error, res);
  }
};