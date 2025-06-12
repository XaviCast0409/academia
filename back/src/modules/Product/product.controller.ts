import { Response, Request } from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductsByProfessor,
} from "./product.service";

import { errorHelper } from "../../utils/error";

export const getProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProduct(parseInt(id));
    res.status(200).json(product);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const createProductController = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const product = await createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const product = await updateProduct(parseInt(id), productData);
    res.status(200).json(product);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(parseInt(id));
    res.status(204).send();
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const professorId = req.query.professorId ? parseInt(req.query.professorId as string) : undefined;
  try {
    const products = await getAllProducts(page, professorId);
    res.status(200).json(products);
  } catch (error) {
    errorHelper(error, res);
  }
};

export const getProductsByProfessorController = async (
  req: Request,
  res: Response
) => {
  try {
    const { professorId } = req.params;
    const products = await getProductsByProfessor(parseInt(professorId));
    res.status(200).json(products);
  } catch (error) {
    errorHelper(error, res);
  }
};