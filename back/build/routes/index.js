"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_routes_1 = __importDefault(require("../modules/role/role.routes"));
const user_routes_1 = __importDefault(require("../modules/user/user.routes"));
const activity_routes_1 = __importDefault(require("../modules/Activity/activity.routes"));
const evidence_routes_1 = __importDefault(require("../modules/Evidence/evidence.routes"));
const product_routes_1 = __importDefault(require("../modules/Product/product.routes"));
const transaction_routes_1 = __importDefault(require("../modules/Transaction/transaction.routes"));
const pokemon_routes_1 = __importDefault(require("../modules/Pokemon/pokemon.routes"));
const router = (0, express_1.Router)();
// Importar las rutas de los módulos
router.use("/roles", role_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/activities", activity_routes_1.default);
router.use("/evidences", evidence_routes_1.default);
router.use("/products", product_routes_1.default);
router.use("/transactions", transaction_routes_1.default);
router.use("/pokemons", pokemon_routes_1.default);
exports.default = router;
