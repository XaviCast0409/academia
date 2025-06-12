"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductsByProfessor = exports.getProduct = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getProduct = async (id) => {
    const product = await database_1.default.Product.findByPk(id, {
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
        ],
    });
    return product;
};
exports.getProduct = getProduct;
const getProductsByProfessor = async (professorId) => {
    const products = await database_1.default.Product.findAll({
        where: { professorId },
        include: [
            {
                model: database_1.default.User,
                as: "professor",
                attributes: ["id", "name"],
            },
        ],
    });
    return products;
};
exports.getProductsByProfessor = getProductsByProfessor;
const createProduct = async (productData) => {
    const product = await database_1.default.Product.create(productData);
    return product;
};
exports.createProduct = createProduct;
const updateProduct = async (id, productData) => {
    const product = await database_1.default.Product.findByPk(id);
    if (!product) {
        throw new Error("Product not found");
    }
    await product.update(productData);
    return product;
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    const product = await database_1.default.Product.findByPk(id);
    if (!product) {
        throw new Error("Product not found");
    }
    await product.destroy();
};
exports.deleteProduct = deleteProduct;
const getAllProducts = async (page = 1, professorId) => {
    try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const whereCondition = {};
        if (professorId) {
            whereCondition.professorId = professorId;
        }
        const { rows: products, count: total } = await database_1.default.Product.findAndCountAll({
            where: whereCondition,
            limit,
            offset,
            order: [["id", "ASC"]],
            include: [
                {
                    model: database_1.default.User,
                    as: "professor",
                    attributes: ["id", "name", "email", "roleId"],
                },
            ],
        });
        return {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalProducts: total,
            products,
        };
    }
    catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
};
exports.getAllProducts = getAllProducts;
