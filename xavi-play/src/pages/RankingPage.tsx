import { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { rankingStyles } from '@/styles/ranking.styles';
import { useRankingStore } from '@/store/rankingStore';
import { RankingUser } from '@/types/ranking';

const RankingPage = () => {
  console.log('RankingPage: Component rendered');
  const { 
    users, 
    loading, 
    error, 
    selectedSection,
    loadRanking, 
    setSelectedSection,
  } = useRankingStore();

  useEffect(() => {
    console.log('RankingPage: Initial load');
    loadRanking().catch((error) => {
      Alert.alert('Error', 'No se pudo cargar el ranking');
      console.error('Error loading ranking:', error);
    });
  }, [loadRanking]);

  // Refrescar ranking cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      console.log('RankingPage: Refreshing ranking on focus');
      loadRanking(selectedSection ? { section: selectedSection } : undefined).catch((error) => {
        console.error('Error refreshing ranking:', error);
      });
    }, [loadRanking, selectedSection])
  );

  const handleFilterPress = (section: string) => {
    console.log('Filter pressed:', section);
    const filterValue = section === '' ? null : section;
    setSelectedSection(filterValue);
    loadRanking(filterValue ? { section: filterValue } : undefined).catch((error) => {
      Alert.alert('Error', 'No se pudo aplicar el filtro');
      console.error('Error applying filter:', error);
    });
  };

  const getPositionStyle = (index: number) => {
    switch (index) {
      case 0:
        return rankingStyles.position1;
      case 1:
        return rankingStyles.position2;
      case 2:
        return rankingStyles.position3;
      default:
        return rankingStyles.positionOther;
    }
  };

  const getPositionText = (index: number) => {
    switch (index) {
      case 0:
        return '🥇';
      case 1:
        return '🥈';
      case 2:
        return '🥉';
      default:
        return `${index + 1}`;
    }
  };

  const renderUserCard = (user: RankingUser, index: number) => {
    const positionStyle = getPositionStyle(index);
    const positionText = getPositionText(index);
    
    return (
      <View key={user.id} style={rankingStyles.rankingCard}>
        <View style={[rankingStyles.positionContainer, positionStyle]}>
          <Text style={rankingStyles.positionText}>{positionText}</Text>
        </View>
        
        <View style={rankingStyles.userInfo}>
          <Text style={rankingStyles.userName}>{user.name}</Text>
          <Text style={rankingStyles.userSection}>{user.section}</Text>
          
          <View style={rankingStyles.statsContainer}>
            <View style={rankingStyles.statItem}>
              <Text style={rankingStyles.statValue}>{user.level}</Text>
              <Text style={rankingStyles.statLabel}>Nivel</Text>
            </View>
            <View style={rankingStyles.statItem}>
              <Text style={rankingStyles.statValue}>{user.experience}</Text>
              <Text style={rankingStyles.statLabel}>Exp</Text>
            </View>
            <View style={rankingStyles.statItem}>
              <Text style={rankingStyles.statValue}>{user.xavicoints}</Text>
              <Text style={rankingStyles.statLabel}>XaviCoins</Text>
            </View>
          </View>
          
                     {user.pokemon && (
             <View style={rankingStyles.pokemonContainer}>
               <Image
                 source={{ uri: user.pokemon.imageUrl }}
                 style={rankingStyles.pokemonImage}
                 resizeMode="contain"
               />
               <Text style={rankingStyles.pokemonName}>
                 {user.pokemon.name}
               </Text>
             </View>
           )}
        </View>
      </View>
    );
  };

  const renderFilters = () => {
    const sections = [
      { value: '', label: 'Todas las secciones' },
      { value: '1ro Sec', label: '1ro Secundaria' },
      { value: '2do Sec', label: '2do Secundaria' },
      { value: '3ro Sec', label: '3ro Secundaria' },
      { value: '4to Sec', label: '4to Secundaria' },
      { value: '5to Sec', label: '5to Secundaria' },
    ];

    return (
      <View style={rankingStyles.filtersContainer}>
        <Text style={rankingStyles.filtersTitle}>Filtrar por sección:</Text>
        <View style={rankingStyles.filterButtonsContainer}>
          {sections.map((section) => (
                         <TouchableOpacity
               key={section.value || 'all'}
               style={[
                 rankingStyles.filterButton,
                 (selectedSection === section.value || (selectedSection === null && section.value === '')) && rankingStyles.filterButtonActive
               ]}
               onPress={() => handleFilterPress(section.value)}
               activeOpacity={0.7}
             >
               <Text style={[
                 rankingStyles.filterButtonText,
                 (selectedSection === section.value || (selectedSection === null && section.value === '')) && rankingStyles.filterButtonTextActive
               ]}>
                 {section.label}
               </Text>
             </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={rankingStyles.emptyContainer}>
      <Text style={rankingStyles.emptyIcon}>🏆</Text>
      <Text style={rankingStyles.emptyTitle}>No hay usuarios en el ranking</Text>
      <Text style={rankingStyles.emptyText}>
        {selectedSection 
          ? `No hay estudiantes en la sección "${selectedSection}"`
          : 'Aún no hay estudiantes registrados en el sistema.'
        }
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <PokemonHeader title="Ranking de Estudiantes" />
      <ScrollView 
        style={rankingStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderFilters()}
        
        {loading ? (
          <View style={rankingStyles.loadingContainer}>
            <Text style={rankingStyles.loadingText}>Cargando ranking...</Text>
          </View>
        ) : error ? (
          <View style={rankingStyles.errorContainer}>
            <Text style={rankingStyles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={rankingStyles.retryButton} 
              onPress={() => loadRanking(selectedSection ? { section: selectedSection } : undefined)}
            >
              <Text style={rankingStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : users.length === 0 ? (
          renderEmptyState()
        ) : (
          <View style={rankingStyles.rankingContainer}>
            {users.map((user, index) => renderUserCard(user, index))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default RankingPage; 