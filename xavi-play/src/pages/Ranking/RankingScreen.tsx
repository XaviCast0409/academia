import React, { useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { rankingStyles } from '@/styles/ranking.styles';
import { useRankingStore } from '@/store/rankingStore';
import { RankingUserCard } from './components/RankingUserCard';
import { RankingFilters } from './components/RankingFilters';
import { RankingEmptyState } from './components/RankingEmptyState';

export const RankingScreen: React.FC = () => {
  const { users, loading, error, selectedSection, loadRanking, setSelectedSection } = useRankingStore();

  useEffect(() => {
    loadRanking().catch(() => {
      Alert.alert('Error', 'No se pudo cargar el ranking');
    });
  }, [loadRanking]);

  useFocusEffect(
    useCallback(() => {
      loadRanking(selectedSection ? { section: selectedSection } : undefined).catch(() => {});
    }, [loadRanking, selectedSection])
  );

  const handleFilterPress = (section: string) => {
    const filterValue = section === '' ? null : section;
    setSelectedSection(filterValue);
    loadRanking(filterValue ? { section: filterValue } : undefined).catch(() => {
      Alert.alert('Error', 'No se pudo aplicar el filtro');
    });
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Ranking de Estudiantes" />
      <ScrollView style={rankingStyles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <RankingFilters selectedSection={selectedSection} onSelect={handleFilterPress} />

        {loading ? (
          <View style={rankingStyles.loadingContainer}>
            <Text style={rankingStyles.loadingText}>Cargando ranking...</Text>
          </View>
        ) : error ? (
          <View style={rankingStyles.errorContainer}>
            <Text style={rankingStyles.errorText}>{error}</Text>
          </View>
        ) : users.length === 0 ? (
          <RankingEmptyState selectedSection={selectedSection} />
        ) : (
          <View style={rankingStyles.rankingContainer}>
            {users.map((user, index) => (
              <RankingUserCard key={user.id} user={user} index={index} />
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RankingScreen;

