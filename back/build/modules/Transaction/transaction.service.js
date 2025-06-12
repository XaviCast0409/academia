"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseProductService = exports.deleteTransaction = exports.updateTransaction = exports.createTransaction = exports.getTransactions = exports.getTransaction = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getTransaction = async (id) => {
    const transaction = await database_1.default.Transaction.findByPk(id);
    return transaction;
};
exports.getTransaction = getTransaction;
const getTransactions = async (page = 1, limit = 10, userIdNumber) => {
    const offset = (page - 1) * limit;
    const { rows: transactions, count: total } = await database_1.default.Transaction.findAndCountAll({
        where: userIdNumber ? { userId: userIdNumber } : {},
        include: [
            {
                model: database_1.default.User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
            {
                model: database_1.default.Product,
                as: 'product',
                attributes: ['id', 'name', 'price'],
            },
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset,
    });
    return { transactions, total };
};
exports.getTransactions = getTransactions;
const createTransaction = async (transaction) => {
    if (!transaction) {
        throw new Error("Transaction is required.");
    }
    const findTransaction = await database_1.default.Transaction.findOne({ where: { id: transaction.id } });
    if (findTransaction) {
        throw new Error("Transaction already exists.");
    }
    const newTransaction = await database_1.default.Transaction.create(transaction);
    return newTransaction;
};
exports.createTransaction = createTransaction;
const updateTransaction = async (id, transaction) => {
    if (!transaction) {
        throw new Error("Transaction is required.");
    }
    const updatedTransaction = await database_1.default.Transaction.update(transaction, { where: { id } });
    return updatedTransaction;
};
exports.updateTransaction = updateTransaction;
const deleteTransaction = async (id) => {
    const transaction = await database_1.default.Transaction.destroy({ where: { id } });
    return transaction;
};
exports.deleteTransaction = deleteTransaction;
const purchaseProductService = async ({ userId, productId }) => {
    const t = await database_1.default.sequelize.transaction(); // Transacción de Sequelize
    try {
        const user = await database_1.default.User.findByPk(userId, { transaction: t });
        if (!user)
            throw new Error('Usuario no encontrado');
        const product = await database_1.default.Product.findByPk(productId, { transaction: t });
        if (!product)
            throw new Error('Producto no encontrado');
        if ((user.xavicoints ?? 0) < product.price) {
            throw new Error('Fondos insuficientes');
        }
        // Descontar xavicoins del usuario
        user.xavicoints = (user.xavicoints ?? 0) - product.price;
        await user.save({ transaction: t });
        // Crear transacción
        await database_1.default.Transaction.create({
            userId: user.id,
            type: 'purchase',
            amount: product.price,
            description: `Compra del producto "${product.name}"`,
            productId
        }, { transaction: t });
        await t.commit();
        return { success: true, message: 'Compra realizada con éxito' };
    }
    catch (error) {
        await t.rollback();
        throw new Error(error.message || 'Error al procesar la compra');
    }
};
exports.purchaseProductService = purchaseProductService;
