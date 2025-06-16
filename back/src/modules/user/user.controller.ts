import { Response, Request } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
} from "./user.service";
import { UserInput } from "../../models/User";
import { errorHelper } from "../../utils/error";
import { log } from "console";


export const getUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, pokemonId, section } = req.body as UserInput;
    const user = await createUser(name, email, password, roleId, pokemonId, section);
    res.json(user);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUser(parseInt(id), req.body); // ahora acepta cualquier campo parcial

    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(updatedUser);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(parseInt(id));
    res.json(user);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (error: any) {
    errorHelper(error, res);
  }
};
