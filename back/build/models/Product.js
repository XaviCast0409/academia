"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    static associate(db) {
        Product.belongsTo(db.User, {
            foreignKey: "professorId",
            as: "professor",
        });
        Product.hasMany(db.Transaction, {
            foreignKey: "productId",
            as: "transactions",
        });
    }
    static initModel(sequelize) {
        Product.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            professorId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
        }, {
            sequelize,
            modelName: "Product",
            tableName: "products",
            timestamps: true,
        });
    }
}
exports.Product = Product;
exports.default = Product;
