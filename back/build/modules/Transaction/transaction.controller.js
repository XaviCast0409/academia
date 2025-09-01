"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfessorProductTransactionsController = exports.purchaseProductController = exports.deleteTransactionController = exports.updateTransactionController = exports.createTransactionController = exports.getTransactionController = exports.getAllTransactionscontroller = void 0;
const transaction_service_1 = require("./transaction.service");
const error_1 = require("../../utils/error");
const getAllTransactionscontroller = async (req, res) => {
    try {
        const { page, limit, userId } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const userIdNumber = userId ? parseInt(userId) : undefined;
        const transactions = await (0, transaction_service_1.getTransactions)(pageNumber, limitNumber, userIdNumber);
        res.status(200).json(transactions);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAllTransactionscontroller = getAllTransactionscontroller;
const getTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await (0, transaction_service_1.getTransaction)(parseInt(id));
        res.status(200).json(transaction);
    }
    catch (error) {
        (0, error_1.errorHelper)(res, error);
    }
};
exports.getTransactionController = getTransactionController;
const createTransactionController = async (req, res) => {
    try {
        const transaction = req.body;
        const newTransaction = await (0, transaction_service_1.createTransaction)(transaction);
        res.status(201).json(newTransaction);
    }
    catch (error) {
        (0, error_1.errorHelper)(res, error);
    }
};
exports.createTransactionController = createTransactionController;
const updateTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = req.body;
        const updatedTransaction = await (0, transaction_service_1.updateTransaction)(parseInt(id), transaction);
        res.status(200).json(updatedTransaction);
    }
    catch (error) {
        (0, error_1.errorHelper)(res, error);
    }
};
exports.updateTransactionController = updateTransactionController;
const deleteTransactionController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await (0, transaction_service_1.deleteTransaction)(parseInt(id));
        res.status(200).json(deletedTransaction);
    }
    catch (error) {
        (0, error_1.errorHelper)(res, error);
    }
};
exports.deleteTransactionController = deleteTransactionController;
const purchaseProductController = async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
    }
    try {
        const result = await (0, transaction_service_1.purchaseProductService)({ userId, productId });
        res.status(200).json(result);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.purchaseProductController = purchaseProductController;
const getProfessorProductTransactionsController = async (req, res) => {
    try {
        const { professorId } = req.params;
        const { page, limit } = req.query;
        const pageNumber = parseInt(page);
        const limitNumber = parseInt(limit);
        const transactions = await (0, transaction_service_1.getProfessorProductTransactions)(parseInt(professorId), pageNumber, limitNumber);
        res.status(200).json(transactions);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getProfessorProductTransactionsController = getProfessorProductTransactionsController;
