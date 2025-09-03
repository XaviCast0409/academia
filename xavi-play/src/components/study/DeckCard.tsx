import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { studyStyles } from '@/styles/study.styles';
import { StudyDeck } from '@/types/StudyTypes';

interface DeckCardProps {
  deck: StudyDeck;
  onPress: () => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ deck, onPress }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basico': return '#10b981';
      case 'intermedio': return '#f59e0b';
      case 'avanzado': return '#ef4444';
      case 'experto': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        studyStyles.deckCard,
        pressed && studyStyles.deckCardPressed
      ]}
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
    >
      <View style={studyStyles.deckHeader}>
        <Text style={studyStyles.deckIcon}>{deck.icon}</Text>
        <Text style={studyStyles.deckTitle} numberOfLines={2}>
          {deck.displayName}
        </Text>
      </View>

      <Text style={studyStyles.deckDescription} numberOfLines={2}>
        {deck.description}
      </Text>

      <View style={studyStyles.deckStats}>
        <View style={studyStyles.deckStat}>
          <Text style={studyStyles.deckStatValue}>{deck.cardCount}</Text>
          <Text style={studyStyles.deckStatLabel}>Tarjetas</Text>
        </View>

        <View style={studyStyles.deckStat}>
          <Text style={[
            studyStyles.deckStatValue,
            { color: getDifficultyColor(deck.avgDifficulty) }
          ]}>
            {deck.avgDifficulty}
          </Text>
          <Text style={studyStyles.deckStatLabel}>Dificultad</Text>
        </View>

        <View style={studyStyles.deckStat}>
          <Text style={[
            studyStyles.deckStatValue,
            { color: '#fbbf24' }
          ]}>
            {deck.totalXavicoins}
          </Text>
          <Text style={studyStyles.deckStatLabel}>XaviCoins</Text>
        </View>
      </View>
    </Pressable>
  );
};
