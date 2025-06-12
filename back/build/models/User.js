"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(db) {
        // Relación existente con Role
        User.belongsTo(db.Role, {
            foreignKey: "roleId",
            as: "role",
        });
        // Relación con Product (un profesor puede tener muchos productos)
        User.hasMany(db.Product, {
            foreignKey: "professorId",
            as: "products",
        });
        // Relación con Activity (un profesor puede crear muchas actividades)
        User.hasMany(db.Activity, {
            foreignKey: "professorId",
            as: "activities",
        });
        // Relación con Evidence (un alumno puede subir muchas evidencias)
        User.hasMany(db.Evidence, {
            foreignKey: "studentId",
            as: "evidences",
        });
        // Relación con Transaction (un usuario puede tener muchas transacciones)
        User.hasMany(db.Transaction, {
            foreignKey: "userId",
            as: "transactions",
        });
        User.belongsTo(db.Pokemon, {
            foreignKey: "pokemonId",
            as: "pokemon",
        });
    }
    static initModel(sequelize) {
        User.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            roleId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "roles", // Nombre de la tabla relacionada
                    key: "id",
                },
            },
            pokemonId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true, // Relación opcional con Pokémon
                references: {
                    model: "pokemons", // Nombre de la tabla relacionada
                    key: "id",
                },
            },
            xavicoints: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0, // Valor por defecto para xavicoints
            },
        }, {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
        });
    }
}
exports.User = User;
exports.default = User;
