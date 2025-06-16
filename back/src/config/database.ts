import { Sequelize } from "sequelize";
import dataConfig from "./environment";
import fs from "fs";
import path from "path";

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

const modelsDir = path.join(__dirname, "../models");

fs.readdirSync(modelsDir)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file.slice(-3) === ".js" && !file.includes("index")
    );
  })
  .forEach((file: string) => {
    const modelModule = require(path.join(modelsDir, file));
    const model = modelModule.default || modelModule;
    if (typeof model.initModel === "function") {
      model.initModel(sequelize); // Usar initModel
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
    await sequelize.authenticate();
    console.log("Conexión exitosa a la base de datos.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
