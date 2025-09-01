"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = __importDefault(require("./environment"));
const VerificationCode_1 = require("../models/VerificationCode");
const User_1 = require("../models/User");
const Activity_1 = require("../models/Activity");
const Evidence_1 = require("../models/Evidence");
const Achievement_1 = require("../models/Achievement");
const UserAchievement_1 = require("../models/UserAchievement");
const Mission_1 = require("../models/Mission");
const UserMission_1 = require("../models/UserMission");
const Role_1 = require("../models/Role");
const Pokemon_1 = require("../models/Pokemon");
const Product_1 = require("../models/Product");
const Transaction_1 = require("../models/Transaction");
const Notification_1 = require("../models/Notification");
const StudyCard_1 = require("../models/StudyCard");
const UserStudyCard_1 = require("../models/UserStudyCard");
const StudySession_1 = require("../models/StudySession");
const db = {};
/* export const sequelize = new Sequelize({
  username: dataConfig.development.username,
  password: dataConfig.development.password,
  database: dataConfig.development.database,
  host: dataConfig.development.host,
  dialect: "postgres",
  logging: false,
}); */
// configuracion produccion de la base de datos
exports.sequelize = new sequelize_1.Sequelize(environment_1.default.production.url, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Cambia esto según tus necesidades de seguridad
        },
    },
});
// Inicializar todos los modelos manualmente
const models = [
    User_1.User,
    Activity_1.Activity,
    Evidence_1.Evidence,
    Achievement_1.Achievement,
    UserAchievement_1.UserAchievement,
    Mission_1.Mission,
    UserMission_1.UserMission,
    Role_1.Role,
    Pokemon_1.Pokemon,
    Product_1.Product,
    Transaction_1.Transaction,
    Notification_1.Notification,
    VerificationCode_1.VerificationCode,
    StudyCard_1.StudyCard,
    UserStudyCard_1.UserStudyCard,
    StudySession_1.StudySession
];
// Inicializar modelos
models.forEach((model) => {
    if (typeof model.initModel === "function") {
        model.initModel(exports.sequelize);
    }
    if (model.name) {
        db[model.name] = model;
    }
});
// Configurar asociaciones
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
(async () => {
    try {
        await exports.sequelize.authenticate();
        // conexión exitosa
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();
db.sequelize = exports.sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
