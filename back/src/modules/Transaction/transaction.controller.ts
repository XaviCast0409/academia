import { Response, Request } from "express";
import {
  getTransaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  purchaseProductService,
  getProfessorProductTransactions
} from "./transaction.service";
import { errorHelper } from "../../utils/error";

export const getAllTransactionscontroller = async (req: Request, res: Response) => {
  try {
    const { page, limit, userId } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const userIdNumber = userId ? parseInt(userId as string) : undefined;
    const transactions = await getTransactions(pageNumber, limitNumber, userIdNumber);
    res.status(200).json(transactions);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const getTransactionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await getTransaction(parseInt(id));
    res.status(200).json(transaction);
  } catch (error: any) {
    errorHelper(res, error);
  }
};

export const createTransactionController = async (req: Request, res: Response) => {
  try {
    const transaction = req.body;
    const newTransaction = await createTransaction(transaction);
    res.status(201).json(newTransaction);
  } catch (error: any) {
    errorHelper(res, error);
  }
};

export const updateTransactionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = req.body;
    const updatedTransaction = await updateTransaction(parseInt(id), transaction);
    res.status(200).json(updatedTransaction);
  } catch (error: any) {
    errorHelper(res, error);
  }
};

export const deleteTransactionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await deleteTransaction(parseInt(id));
    res.status(200).json(deletedTransaction);
  } catch (error: any) {
    errorHelper(res, error);
  }
};

export const purchaseProductController = async (req: Request, res: Response) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
    const result = await purchaseProductService({ userId, productId });
    res.status(200).json(result);
  } catch (error: any) {
    errorHelper(error, res);
  }
};

export const getProfessorProductTransactionsController = async (req: Request, res: Response) => {
  try {
    const { professorId } = req.params;
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const transactions = await getProfessorProductTransactions(parseInt(professorId), pageNumber, limitNumber);
    res.status(200).json(transactions);
  } catch (error: any) {
    errorHelper(error, res);
  }
};