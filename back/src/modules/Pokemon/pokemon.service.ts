// services/fetchPokemonService.ts
import axios from "axios";
import db from "../../config/database";

export const fetchAndStoreFirstGenPokemons = async (): Promise<void> => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemonList = response.data.results;

    for (const pokemon of pokemonList) {
      const details = await axios.get(pokemon.url);
      const { name, id, sprites } = details.data;

      const imageUrl = sprites.front_default;
      const highResImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      await db.Pokemon.create({
        name,
        imageUrl,
        highResImageUrl, // Agregamos nueva propiedad
      });
    }

    console.log("Pokémones de la primera generación guardados exitosamente.");
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    throw error;
  }
};


export const getAllPokemons = async (page: number = 1): Promise<any> => {
  try {
    const limit = 20;
    const offset = (page - 1) * limit;

    const { rows: pokemons, count: total } = await db.Pokemon.findAndCountAll({
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
  } catch (error) {
    console.error("Error al obtener los Pokémon:", error);
    throw error;
  }
};