import db from "../../config/database";
import { TransactionOutput, TransactionInput } from "../../models/Transaction";

export const getTransaction = async (id: number): Promise<TransactionOutput> => {
  const transaction = await db.Transaction.findByPk(id);
  return transaction;
};

export const getTransactions = async (
  page: number = 1,
  limit: number = 10,
  userIdNumber?: number
): Promise<{ transactions: TransactionOutput[]; total: number }> => {
  const offset = (page - 1) * limit;

  const { rows: transactions, count: total } = await db.Transaction.findAndCountAll({
    where: userIdNumber ? { userId: userIdNumber } : {},
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'name', 'email'],
      },
      {
        model: db.Product,
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

export const createTransaction = async (transaction: TransactionInput): Promise<TransactionOutput> => {
  if (!transaction) {
    throw new Error("Transaction is required.");
  }

  const findTransaction = await db.Transaction.findOne({ where: { id: transaction.id } });

  if (findTransaction) {
    throw new Error("Transaction already exists.");
  }

  const newTransaction = await db.Transaction.create(transaction);
  return newTransaction;
};

export const updateTransaction = async (id: number, transaction: TransactionInput): Promise<TransactionOutput> => {
  if (!transaction) {
    throw new Error("Transaction is required.");
  }

  const updatedTransaction = await db.Transaction.update(transaction, { where: { id } });
  return updatedTransaction;
};

export const deleteTransaction = async (id: number): Promise<number> => {
  const transaction = await db.Transaction.destroy({ where: { id } });
  return transaction;
};

interface PurchaseInput {
  userId: number;
  productId: number;
}

export const purchaseProductService = async ({ userId, productId }: PurchaseInput) => {
  const t = await db.sequelize.transaction(); // Transacción de Sequelize

  try {
    const user = await db.User.findByPk(userId, { transaction: t });
    if (!user) throw new Error('Usuario no encontrado');

    const product = await db.Product.findByPk(productId, { transaction: t });
    if (!product) throw new Error('Producto no encontrado');

    if ((user.xavicoints ?? 0) < product.price) {
      throw new Error('Fondos insuficientes');
    }

    // Descontar xavicoins del usuario
    user.xavicoints = (user.xavicoints ?? 0) - product.price;
    await user.save({ transaction: t });

    // Crear transacción
    await db.Transaction.create(
      {
        userId: user.id,
        type: 'purchase',
        amount: product.price,
        description: `Compra del producto "${product.name}"`,
        productId
      },
      { transaction: t }
    );

    await t.commit();

    return { success: true, message: 'Compra realizada con éxito' };
  } catch (error: any) {
    await t.rollback();
    throw new Error(error.message || 'Error al procesar la compra');
  }
};