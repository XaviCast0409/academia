"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
// models/Pokemon.ts
const sequelize_1 = require("sequelize");
class Pokemon extends sequelize_1.Model {
    static associate(db) {
        Pokemon.hasMany(db.User, {
            foreignKey: "pokemonId",
            as: "users",
        });
    }
    static initModel(sequelize) {
        Pokemon.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            highResImageUrl: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true, // Optional field
            },
        }, {
            sequelize,
            modelName: "Pokemon",
            tableName: "pokemons",
            timestamps: true,
        });
    }
}
exports.Pokemon = Pokemon;
exports.default = Pokemon;
