"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByProfessorController = exports.getAllProductsController = exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getProductController = void 0;
const product_service_1 = require("./product.service");
const error_1 = require("../../utils/error");
const getProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await (0, product_service_1.getProduct)(parseInt(id));
        res.status(200).json(product);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getProductController = getProductController;
const createProductController = async (req, res) => {
    try {
        const productData = req.body;
        const product = await (0, product_service_1.createProduct)(productData);
        res.status(201).json(product);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.createProductController = createProductController;
const updateProductController = async (req, res) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const product = await (0, product_service_1.updateProduct)(parseInt(id), productData);
        res.status(200).json(product);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, product_service_1.deleteProduct)(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.deleteProductController = deleteProductController;
const getAllProductsController = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const professorId = req.query.professorId ? parseInt(req.query.professorId) : undefined;
    try {
        const products = await (0, product_service_1.getAllProducts)(page, professorId);
        res.status(200).json(products);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getAllProductsController = getAllProductsController;
const getProductsByProfessorController = async (req, res) => {
    try {
        const { professorId } = req.params;
        const products = await (0, product_service_1.getProductsByProfessor)(parseInt(professorId));
        res.status(200).json(products);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getProductsByProfessorController = getProductsByProfessorController;
