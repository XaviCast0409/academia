"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPokemons = exports.fetchAndStoreFirstGenPokemons = void 0;
// services/fetchPokemonService.ts
const axios_1 = __importDefault(require("axios"));
const database_1 = __importDefault(require("../../config/database"));
const fetchAndStoreFirstGenPokemons = async () => {
    try {
        const response = await axios_1.default.get("https://pokeapi.co/api/v2/pokemon?limit=151");
        const pokemonList = response.data.results;
        for (const pokemon of pokemonList) {
            const details = await axios_1.default.get(pokemon.url);
            const { name, id, sprites } = details.data;
            const imageUrl = sprites.front_default;
            const highResImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            await database_1.default.Pokemon.create({
                name,
                imageUrl,
                highResImageUrl, // Agregamos nueva propiedad
            });
        }
    }
    catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        throw error;
    }
};
exports.fetchAndStoreFirstGenPokemons = fetchAndStoreFirstGenPokemons;
const getAllPokemons = async (page = 1) => {
    try {
        const limit = 20;
        const offset = (page - 1) * limit;
        const { rows: pokemons, count: total } = await database_1.default.Pokemon.findAndCountAll({
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPokemons: total,
            pokemons,
        };
    }
    catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        throw error;
    }
};
exports.getAllPokemons = getAllPokemons;
