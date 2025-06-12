import { Router } from "express";
import {
  getProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllProductsController,
  getProductsByProfessorController
} from "./product.controller";

const routerProduct = Router();

routerProduct.get("/get-id/:id", getProductController);
routerProduct.post("/create", createProductController);
routerProduct.put("/update/:id", updateProductController);
routerProduct.delete("/delete/:id", deleteProductController);
routerProduct.get("/get-all", getAllProductsController);
routerProduct.get("/professor/:id", getProductsByProfessorController);

export default routerProduct;