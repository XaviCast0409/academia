import { Router } from "express";
import {
  getAllTransactionscontroller,
  getTransactionController,
  createTransactionController,
  updateTransactionController,
  deleteTransactionController,
  purchaseProductController,
  getProfessorProductTransactionsController
} from "./transaction.controller";

const transactionRouter = Router();

transactionRouter.get("/get-all", getAllTransactionscontroller);
transactionRouter.get("/:id", getTransactionController);
transactionRouter.post("/", createTransactionController);
transactionRouter.put("/:id", updateTransactionController);
transactionRouter.delete("/:id", deleteTransactionController);
transactionRouter.post("/purchase", purchaseProductController);
transactionRouter.get("/professor/:professorId", getProfessorProductTransactionsController);

export default transactionRouter;