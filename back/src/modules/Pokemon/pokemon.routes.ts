// routes/pokemonRoutes.ts
import { Router } from "express";
import { loadFirstGenPokemons, getPokemons } from "./pokemon.controller";

const routerPokemon = Router();

routerPokemon.get("/load", loadFirstGenPokemons);
routerPokemon.get("/get-all", getPokemons);

export default routerPokemon;
