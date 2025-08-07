import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import { pokemonSelectionStyles } from '@/styles/pokemonSelection.styles';
import { Pokemon } from '@/services/userService';

interface PokemonSelectionStepProps {
  pokemons: Pokemon[];
  selectedPokemon: Pokemon | null;
  currentPage: number;
  totalPages: number;
  loadingMore: boolean;
  onPokemonSelect: (pokemon: Pokemon) => void;
  onNext: () => void;
  onBack: () => void;
  onLoadMore: () => void;
  onPageChange: (page: number) => void;
  isValid: boolean;
  creatingUser: boolean;
}

const PokemonSelectionStep: React.FC<PokemonSelectionStepProps> = ({
  pokemons,
  selectedPokemon,
  currentPage,
  totalPages,
  loadingMore,
  onPokemonSelect,
  onNext,
  onBack,
  onLoadMore,
  onPageChange,
  isValid,
  creatingUser,
}) => {
  return (
    <View style={pokemonSelectionStyles.container}>
      <View style={pokemonSelectionStyles.contentContainer}>
        <View style={pokemonSelectionStyles.header}>
          <Text style={pokemonSelectionStyles.title}>¡Elige tu Pokémon!</Text>
          <Text style={pokemonSelectionStyles.subtitle}>
            Paso 2 de 2: Selecciona tu compañero de aventura
          </Text>
        </View>

        <ScrollView
          style={pokemonSelectionStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={pokemonSelectionStyles.scrollContent}
        >
          <View style={pokemonSelectionStyles.pokemonGrid}>
            {pokemons.map((pokemon) => (
              <TouchableOpacity
                key={pokemon.id}
                style={[
                  pokemonSelectionStyles.pokemonCard,
                  selectedPokemon?.id === pokemon.id && pokemonSelectionStyles.pokemonCardSelected
                ]}
                onPress={() => onPokemonSelect(pokemon)}
              >
                <Image
                  source={{ uri: pokemon.highResImageUrl }}
                  style={pokemonSelectionStyles.pokemonImage}
                />
                <Text style={[
                  pokemonSelectionStyles.pokemonName,
                  selectedPokemon?.id === pokemon.id && pokemonSelectionStyles.pokemonNameSelected
                ]}>
                  {pokemon.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Paginación */}
          <View style={pokemonSelectionStyles.paginationContainer}>
            <TouchableOpacity
              style={[
                pokemonSelectionStyles.paginationButton,
                currentPage === 1 && pokemonSelectionStyles.paginationButtonDisabled
              ]}
              onPress={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Text style={[
                pokemonSelectionStyles.paginationButtonText,
                currentPage === 1 && pokemonSelectionStyles.paginationButtonTextDisabled
              ]}>
                ←
              </Text>
            </TouchableOpacity>

            <Text style={pokemonSelectionStyles.paginationInfo}>
              Página {currentPage} de {totalPages}
            </Text>

            <TouchableOpacity
              style={[
                pokemonSelectionStyles.paginationButton,
                currentPage === totalPages && pokemonSelectionStyles.paginationButtonDisabled
              ]}
              onPress={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Text style={[
                pokemonSelectionStyles.paginationButtonText,
                currentPage === totalPages && pokemonSelectionStyles.paginationButtonTextDisabled
              ]}>
                →
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={pokemonSelectionStyles.buttonContainer}>
        <View style={pokemonSelectionStyles.navigationContainer}>
          <TouchableOpacity
            style={pokemonSelectionStyles.backButton}
            onPress={onBack}
            disabled={creatingUser}
          >
            <Text style={pokemonSelectionStyles.backButtonText}>← Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              pokemonSelectionStyles.createButton,
              !isValid && pokemonSelectionStyles.createButtonDisabled
            ]}
            onPress={onNext}
            disabled={!isValid || creatingUser}
          >
            {creatingUser ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={[
                pokemonSelectionStyles.createButtonText,
                !isValid && pokemonSelectionStyles.createButtonTextDisabled
              ]}>
                ¡Crear Usuario!
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PokemonSelectionStep; 