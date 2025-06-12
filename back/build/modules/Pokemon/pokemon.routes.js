"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/pokemonRoutes.ts
const express_1 = require("express");
const pokemon_controller_1 = require("./pokemon.controller");
const routerPokemon = (0, express_1.Router)();
routerPokemon.get("/load", pokemon_controller_1.loadFirstGenPokemons);
routerPokemon.get("/get-all", pokemon_controller_1.getPokemons);
exports.default = routerPokemon;
