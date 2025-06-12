import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import type { ControllerRenderProps } from 'react-hook-form';
import { getAllPokemons } from '../../services/pokemonService';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string; // debe coincidir con el campo que devuelves en la DB
}

interface Props {
  field: ControllerRenderProps<any, 'pokemonId'>;
}

export const PokemonSelector = ({ field }: Props) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPokemons = async () => {
    try {
      const { pokemons, totalPages } = await getAllPokemons(page);
      setPokemons(pokemons || []);
      setTotalPages(totalPages || 1);
    } catch (err) {
      console.error('Error al cargar los Pokémon:', err);
      setPokemons([]);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
    <Box mt={0} p={3} bgcolor="#F5E8DC" >
      <Typography variant="h6" mb={1}>
        Selecciona tu Pokémon
      </Typography>

      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id} >
            <Card
              sx={{
                border:
                  field.value === pokemon.id
                    ? '3px solid #E07F3F'
                    : '1px solid #DDD',
                cursor: 'pointer',
                transition: '0.2s',
                boxShadow: field.value === pokemon.id ? '0px 4px 12px rgba(0,0,0,0.2)' : 'none',
                '&:hover': {
                  border: '2px solid #E07F3F',
                },
              }}
              onClick={() => field.onChange(pokemon.id)}
            >
              <CardMedia
                component="img"
                height="100"
                image={pokemon.imageUrl}
                alt={pokemon.name}
              />
              <CardContent>
                <Typography align="center" fontSize={14}>
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          sx={{
            borderColor: '#0D3745',
            color: '#0D3745',
            '&:hover': {
              backgroundColor: '#0D3745',
              color: '#fff',
            },
          }}
        >
          Anterior
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          sx={{
            borderColor: '#0D3745',
            color: '#0D3745',
            '&:hover': {
              backgroundColor: '#0D3745',
              color: '#fff',
            },
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};
