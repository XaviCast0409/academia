import { Model, DataTypes, Sequelize, Optional } from "sequelize";

export interface TransactionAttributes {
  id: number;
  userId: number;           // Relación con el usuario
  productId?: number | null; // Relación con el producto (opcional para otras transacciones como assignment)
  type: "purchase" | "assignment";
  amount: number;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TransactionInput extends Optional<TransactionAttributes, "id" | "productId" | "createdAt" | "updatedAt"> {}
export interface TransactionOutput extends Required<TransactionAttributes> {}

export class Transaction extends Model<TransactionAttributes, TransactionInput> implements TransactionAttributes {
  public id!: number;
  public userId!: number;
  public productId!: number | null;
  public type!: "purchase" | "assignment";
  public amount!: number;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(db: any) {
    Transaction.belongsTo(db.User, {
      foreignKey: "userId",
      as: "user",
    });

    Transaction.belongsTo(db.Product, {
      foreignKey: "productId",
      as: "product",
    });
  }

  static initModel(sequelize: Sequelize) {
    Transaction.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "products",
            key: "id",
          },
        },
        type: {
          type: DataTypes.ENUM("purchase", "assignment"),
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Transaction",
        tableName: "transactions",
        timestamps: true,
      }
    );
  }
}

export default Transaction;
