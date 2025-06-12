import { Router } from "express";
import {
  getAllTransactionscontroller,
  getTransactionController,
  createTransactionController,
  updateTransactionController,
  deleteTransactionController,
  purchaseProductController
} from "./transaction.controller";

const transactionRouter = Router();

transactionRouter.get("/", getAllTransactionscontroller);
transactionRouter.get("/:id", getTransactionController);
transactionRouter.post("/", createTransactionController);
transactionRouter.put("/:id", updateTransactionController);
transactionRouter.delete("/:id", deleteTransactionController);
transactionRouter.post("/purchase", purchaseProductController);

export default transactionRouter;