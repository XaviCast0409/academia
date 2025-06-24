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
import db from "../../config/database";


export const getUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await getUser(parseInt(id));
    res.status(200).json(user);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const { section } = req.query;
    const users = await getUsers(section as string);
    res.json(users);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, roleId, pokemonId, section } = req.body;
    const user = await createUser(name, email, password, roleId, pokemonId, section);
    res.json(user);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = await updateUser(parseInt(id), userData);
    res.json(user);
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
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const verifyCodeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    if (user.isVerified) {
      res.status(400).json({ message: "El usuario ya está verificado" });
      return;
    }

    if (!user.verificationCode || !user.verificationCodeExpires) {
      res.status(400).json({ message: "Código de verificación no encontrado" });
      return;
    }

    if (user.verificationCodeExpires < new Date()) {
      res.status(400).json({ message: "Código de verificación expirado" });
      return;
    }

    if (user.verificationCode !== code) {
      res.status(400).json({ message: "Código de verificación inválido" });
      return;
    }

    await user.update({
      isVerified: true,
      verificationCode: null,
      verificationCodeExpires: null,
    });

    res.json({ message: "Código verificado correctamente" });
  } catch (error) {
    errorHelper(error, res);
  }
};
