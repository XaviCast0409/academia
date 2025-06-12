import { Router } from "express";
import {
  getRoleController,
  getRolesController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
} from "./role.controller";

const routerRole = Router();

routerRole.get("/", getRolesController);
routerRole.get("/:id", getRoleController);
routerRole.post("/create", createRoleController);
routerRole.put("/:id", updateRoleController);
routerRole.delete("/:id", deleteRoleController);

export default routerRole;