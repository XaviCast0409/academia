import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { DeckCard } from '@/components/study/DeckCard';
import { SessionConfig } from '@/components/study/SessionConfig';
import { useStudyStore } from '@/store/studyStore';
import { studyStyles } from '@/styles/study.styles';
import { StudyDeck } from '@/types/StudyTypes';
import { RootStackParamList } from '@/types/navigation';

type StudyDecksNavigationProp = StackNavigationProp<RootStackParamList>;

const StudyDecksPage: React.FC = () => {
  const navigation = useNavigation<StudyDecksNavigationProp>();
  const [selectedDeck, setSelectedDeck] = useState<StudyDeck | null>(null);
  
  const {
    decks,
    isLoading,
    error,
    loadDecks,
    startStudySession,
    clearError
  } = useStudyStore();

  useEffect(() => {
    loadDecks();
  }, [loadDecks]);

  const handleDeckPress = (deck: StudyDeck) => {
    if (deck.cardCount === 0) {
      Alert.alert(
        'Mazo vacío',
        'Este mazo no tiene tarjetas disponibles para estudiar.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    setSelectedDeck(deck);
  };

  const handleStartSession = async (minutes: number) => {
    if (!selectedDeck) return;

    try {
      const session = await startStudySession(
        selectedDeck.category,
        selectedDeck.mathTopic,
        minutes
      );

      navigation.navigate('StudySession', {
        deckCategory: selectedDeck.category,
        deckMathTopic: selectedDeck.mathTopic,
        sessionGoal: minutes
      });
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'No se pudo iniciar la sesión',
        [{ text: 'OK' }]
      );
    }
  };

  const renderDeck = ({ item }: { item: StudyDeck }) => (
    <DeckCard
      deck={item}
      onPress={() => handleDeckPress(item)}
    />
  );

  const renderEmptyState = () => (
    <View style={studyStyles.emptyState}>
      <Text style={studyStyles.emptyStateIcon}>🎒</Text>
      <Text style={studyStyles.emptyStateTitle}>
        No hay mazos disponibles
      </Text>
      <Text style={studyStyles.emptyStateText}>
        Los mazos de estudio aparecerán aquí cuando estén disponibles.
      </Text>
    </View>
  );

  const renderError = () => (
    <View style={studyStyles.errorContainer}>
      <Text style={studyStyles.errorText}>{error}</Text>
    </View>
  );

  if (selectedDeck) {
    return (
      <ScreenWrapper>
        <PokemonHeader 
          title="Configurar Sesión" 
          showBackButton 
          onBackPress={() => setSelectedDeck(null)}
        />
        <SessionConfig
          deck={selectedDeck}
          onStartSession={handleStartSession}
          onCancel={() => setSelectedDeck(null)}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mazos de Estudio" />
      
      <View style={studyStyles.container}>
        {error && renderError()}
        
        {isLoading ? (
          <View style={studyStyles.loadingContainer}>
            <ActivityIndicator size="large" color="#fbbf24" />
            <Text style={studyStyles.loadingText}>
              Cargando mazos...
            </Text>
          </View>
        ) : (
          <FlatList
            data={decks}
            renderItem={renderDeck}
            keyExtractor={(item) => `${item.category}-${item.mathTopic || 'general'}`}
            contentContainerStyle={[
              studyStyles.scrollContent,
              decks.length === 0 && { flex: 1 }
            ]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyState}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default StudyDecksPage;
