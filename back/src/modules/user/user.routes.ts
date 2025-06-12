import { Router } from "express";
import {
    getUserController,
    getUsersController,
    createUserController,
    updateUserController,
    deleteUserController,
    loginUserController,
} from "./user.controller";

const routerUser = Router();

routerUser.get("/", getUsersController);
routerUser.get("/byId/:id", getUserController);
routerUser.post("/create", createUserController);
routerUser.put("/:id", updateUserController);
routerUser.delete("/:id", deleteUserController);
routerUser.post("/login", loginUserController);

export default routerUser;

