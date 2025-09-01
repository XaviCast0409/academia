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
const emailVerification_routes_1 = __importDefault(require("../modules/emailVerification/emailVerification.routes"));
const mission_router_1 = __importDefault(require("../modules/mission/mission.router"));
const achievement_router_1 = __importDefault(require("../modules/achievement/achievement.router"));
const notification_routes_1 = __importDefault(require("../modules/notifications/notification.routes"));
const studyCard_routes_1 = __importDefault(require("../modules/studyCard/studyCard.routes"));
const studySession_routes_1 = __importDefault(require("../modules/studySession/studySession.routes"));
const router = (0, express_1.Router)();
// Importar las rutas de los módulos
router.use("/roles", role_routes_1.default);
router.use("/users", user_routes_1.default);
router.use("/activities", activity_routes_1.default);
router.use("/evidences", evidence_routes_1.default);
router.use("/products", product_routes_1.default);
router.use("/transactions", transaction_routes_1.default);
router.use("/pokemons", pokemon_routes_1.default);
// Email verification routes
router.use("/email-verification", emailVerification_routes_1.default);
router.use("/missions", mission_router_1.default);
router.use("/achievements", achievement_router_1.default);
router.use('/notifications', notification_routes_1.default);
// Study system routes
router.use("/study-cards", studyCard_routes_1.default);
router.use("/study-sessions", studySession_routes_1.default);
exports.default = router;
