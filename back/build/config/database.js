"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const environment_1 = __importDefault(require("./environment"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const modelsDir = path_1.default.join(__dirname, "../models");
fs_1.default.readdirSync(modelsDir)
    .filter((file) => {
    return (file.indexOf(".") !== 0 && file.slice(-3) === ".ts" && !file.includes("index"));
})
    .forEach((file) => {
    const modelModule = require(path_1.default.join(modelsDir, file));
    const model = modelModule.default || modelModule;
    if (typeof model.initModel === "function") {
        model.initModel(exports.sequelize); // Usar initModel
    }
    if (model.name) {
        db[model.name] = model;
    }
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
(async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
})();
db.sequelize = exports.sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
