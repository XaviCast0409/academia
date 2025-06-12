"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const sequelize_1 = require("sequelize");
class Transaction extends sequelize_1.Model {
    static associate(db) {
        Transaction.belongsTo(db.User, {
            foreignKey: "userId",
            as: "user",
        });
        Transaction.belongsTo(db.Product, {
            foreignKey: "productId",
            as: "product",
        });
    }
    static initModel(sequelize) {
        Transaction.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            productId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "products",
                    key: "id",
                },
            },
            type: {
                type: sequelize_1.DataTypes.ENUM("purchase", "assignment"),
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Transaction",
            tableName: "transactions",
            timestamps: true,
        });
    }
}
exports.Transaction = Transaction;
exports.default = Transaction;
