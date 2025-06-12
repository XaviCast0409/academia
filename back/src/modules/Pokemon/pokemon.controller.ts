// controllers/pokemonController.ts
import { Request, Response } from "express";
import { errorHelper } from "../../utils/error";
import { fetchAndStoreFirstGenPokemons } from "./pokemon.service"
import { getAllPokemons } from "./pokemon.service";

export const loadFirstGenPokemons = async (_req: Request, res: Response) => {
  try {
    await fetchAndStoreFirstGenPokemons();
    res.status(200).json({ message: "Pokémones cargados con éxito." });
  } catch (err) {
    errorHelper(err, res);
  }
};

export const getPokemons = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
  try {
    const pokemons = await getAllPokemons(page);
    res.status(200).json(pokemons);
  } catch (error) {
    errorHelper(error, res);
  }
};