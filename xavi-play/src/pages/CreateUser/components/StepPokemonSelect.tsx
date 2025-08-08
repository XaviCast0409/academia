import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { createUserStyles } from '@/styles/createUser.styles';
import userService, { Pokemon } from '@/services/userService';

interface Props {
  selectedPokemonId: number;
  onSelectPokemon: (pokemonId: number) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  submitting: boolean;
}

export const StepPokemonSelect: React.FC<Props> = ({ selectedPokemonId, onSelectPokemon, onSubmit, canSubmit, submitting }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const load = async (p: number) => {
    try {
      setLoading(true);
      const res = await userService.getPokemons(p);
      setPokemons(res.pokemons);
      setTotalPages(res.totalPages);
      setPage(p);
    } catch (e) {
      Alert.alert('Error', 'No se pudieron cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, []);

  return (
    <View>
      <Text style={createUserStyles.title}>Elige tu Pokémon</Text>

      <View style={createUserStyles.pokemonGrid}>
        <View style={createUserStyles.pokemonGridContainer}>
          {pokemons.slice(0, 20).map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[
                createUserStyles.pokemonOption,
                selectedPokemonId === p.id && createUserStyles.pokemonOptionSelected,
              ]}
              onPress={() => onSelectPokemon(p.id)}
            >
              <Image source={{ uri: p.highResImageUrl }} style={createUserStyles.pokemonOptionImage} />
              <Text style={createUserStyles.pokemonOptionText}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={createUserStyles.paginationContainer}>
          <TouchableOpacity
            style={[createUserStyles.paginationButton, page === 1 && createUserStyles.paginationButtonDisabled]}
            onPress={() => load(page - 1)}
            disabled={page === 1 || loading}
          >
            <Text style={[createUserStyles.paginationButtonText, page === 1 && createUserStyles.paginationButtonTextDisabled]}>←</Text>
          </TouchableOpacity>

          <Text style={createUserStyles.paginationInfo}>Página {page} de {totalPages}</Text>

          <TouchableOpacity
            style={[createUserStyles.paginationButton, page === totalPages && createUserStyles.paginationButtonDisabled]}
            onPress={() => load(page + 1)}
            disabled={page === totalPages || loading}
          >
            <Text style={[createUserStyles.paginationButtonText, page === totalPages && createUserStyles.paginationButtonTextDisabled]}>→</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[createUserStyles.button, (!canSubmit || submitting) && createUserStyles.buttonDisabled]}
        onPress={onSubmit}
        disabled={!canSubmit || submitting}
      >
        <Text style={createUserStyles.buttonText}>{submitting ? 'Creando...' : 'Crear Usuario'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StepPokemonSelect;

