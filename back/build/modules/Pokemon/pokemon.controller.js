"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemons = exports.loadFirstGenPokemons = void 0;
const error_1 = require("../../utils/error");
const pokemon_service_1 = require("./pokemon.service");
const pokemon_service_2 = require("./pokemon.service");
const loadFirstGenPokemons = async (_req, res) => {
    try {
        await (0, pokemon_service_1.fetchAndStoreFirstGenPokemons)();
        res.status(200).json({ message: "Pokémones cargados con éxito." });
    }
    catch (err) {
        (0, error_1.errorHelper)(err, res);
    }
};
exports.loadFirstGenPokemons = loadFirstGenPokemons;
const getPokemons = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const pokemons = await (0, pokemon_service_2.getAllPokemons)(page);
        res.status(200).json(pokemons);
    }
    catch (error) {
        (0, error_1.errorHelper)(error, res);
    }
};
exports.getPokemons = getPokemons;
