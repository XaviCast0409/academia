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
  imageUrl: string;
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
    <Box mt={4} p={2} sx={{
      backgroundColor: '#F5E8DC',
      borderRadius: 3,
      border: '3px solid #E07F3F',
      boxShadow: '0px 0px 15px rgba(224, 127, 63, 0.3)',
      fontFamily: "'Press Start 2P', cursive"
    }}>
      <Typography
        variant="h6"
        mb={2}
        align="center"
        sx={{
          fontFamily: "'Press Start 2P'",
          fontSize: '0.75rem',
          color: '#84341C'
        }}
      >
        SELECCIONA TU POKÉMON
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {pokemons.map((pokemon) => (
          <Grid key={pokemon.id}>
            <Card
              onClick={() => field.onChange(pokemon.id)}
              sx={{
                width: 100,
                height: 140,
                cursor: 'pointer',
                border: field.value === pokemon.id
                  ? '4px solid #E07F3F'
                  : '2px solid #0D3745',
                backgroundColor: '#fff',
                transition: '0.2s',
                boxShadow: field.value === pokemon.id
                  ? '0 0 10px #E07F3F'
                  : 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  borderColor: '#E07F3F',
                },
              }}
            >
              <CardMedia
                component="img"
                height="80"
                image={pokemon.imageUrl}
                alt={pokemon.name}
                sx={{ objectFit: 'contain', marginTop: 1 }}
              />
              <CardContent sx={{ padding: 1 }}>
                <Typography
                  align="center"
                  fontSize={10}
                  sx={{ fontFamily: "'Press Start 2P'", wordBreak: 'break-word' }}
                >
                  {pokemon.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={3} display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          sx={{
            fontFamily: "'Press Start 2P'",
            fontSize: '0.5rem',
            borderColor: '#0D3745',
            color: '#0D3745',
            '&:hover': {
              backgroundColor: '#0D3745',
              color: '#fff',
            },
          }}
        >
          ◀ ANTERIOR
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          sx={{
            fontFamily: "'Press Start 2P'",
            fontSize: '0.5rem',
            borderColor: '#0D3745',
            color: '#0D3745',
            '&:hover': {
              backgroundColor: '#0D3745',
              color: '#fff',
            },
          }}
        >
          SIGUIENTE ▶
        </Button>
      </Box>
    </Box>
  );
};
