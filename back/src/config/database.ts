import { Sequelize } from "sequelize";
import dataConfig from "./environment";
import { VerificationCode } from "../models/VerificationCode";
import { User } from "../models/User";
import { Activity } from "../models/Activity";
import { Evidence } from "../models/Evidence";
import { Achievement } from "../models/Achievement";
import { UserAchievement } from "../models/UserAchievement";
import { Mission } from "../models/Mission";
import { UserMission } from "../models/UserMission";
import { Role } from "../models/Role";
import { Pokemon } from "../models/Pokemon";
import { Product } from "../models/Product";
import { Transaction } from "../models/Transaction";

const db: any = {}
/* export const sequelize = new Sequelize({
  username: dataConfig.development.username,
  password: dataConfig.development.password,
  database: dataConfig.development.database,
  host: dataConfig.development.host,
  dialect: "postgres",
  logging: false,
}); */

// configuracion produccion de la base de datos
export const sequelize = new Sequelize(dataConfig.production.url, {
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
  User,
  Activity,
  Evidence,
  Achievement,
  UserAchievement,
  Mission,
  UserMission,
  Role,
  Pokemon,
  Product,
  Transaction,
  VerificationCode
];

// Inicializar modelos
models.forEach((model) => {
  if (typeof model.initModel === "function") {
    model.initModel(sequelize);
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
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
