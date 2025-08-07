import { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import Pagination from '@/components/common/Pagination';
import { activitiesStyles } from '@/styles/activities.styles';
import { useAuthStore } from '@/store/authStore';
import { useActivityStore } from '@/store/activityStore';
import { Activity } from '@/types/activity';

const ActivitiesPage: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuthStore();
  const { 
    activities, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    loadActivities 
  } = useActivityStore();

  useEffect(() => {
    if (user) {
      loadActivities(parseInt(user.id)).catch((error) => {
        Alert.alert('Error', 'No se pudieron cargar las actividades');
        console.error('Error loading activities:', error);
      });
    }
  }, [user, loadActivities]);

  // Refrescar actividades cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      if (user) {
        console.log('ActivitiesPage: Refreshing activities on focus');
        loadActivities(parseInt(user.id)).catch((error) => {
          console.error('Error refreshing activities:', error);
        });
      }
    }, [user, loadActivities])
  );

  const handlePageChange = (page: number) => {
    if (user) {
      loadActivities(parseInt(user.id), page).catch((error) => {
        Alert.alert('Error', 'No se pudo cargar la página');
        console.error('Error loading page:', error);
      });
    }
  };

  const handleActivityPress = (activity: Activity) => {
    console.log('handleActivityPress'); 
    (navigation as any).navigate('ActivityDetails', { activityId: activity.id });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { color: '#059669', backgroundColor: '#d1fae5' }; // green
      case 'intermediate':
        return { color: '#d97706', backgroundColor: '#fed7aa' }; // orange
      case 'advanced':
        return { color: '#dc2626', backgroundColor: '#fecaca' }; // red
      default:
        return { color: '#6b7280', backgroundColor: '#f3f4f6' }; // gray
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'Fácil';
      case 'intermediate':
        return 'Medio';
      case 'advanced':
        return 'Difícil';
      default:
        return difficulty;
    }
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Actividades" />
      <ScrollView 
        style={activitiesStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <View style={activitiesStyles.loadingContainer}>
            <Text style={activitiesStyles.loadingText}>Cargando actividades...</Text>
          </View>
        ) : error ? (
          <View style={activitiesStyles.errorContainer}>
            <Text style={activitiesStyles.errorText}>{error}</Text>
          </View>
        ) : (
          <>
            <View style={activitiesStyles.activitiesContainer}>
              {activities.map((activity: Activity) => (
                <TouchableOpacity 
                  key={activity.id} 
                  style={activitiesStyles.activityCard}
                  onPress={() => handleActivityPress(activity)}
                >
                  <View style={activitiesStyles.activityHeader}>
                    <Image
                      source={{ uri: activity.images[0] || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
                      style={activitiesStyles.activityImage}
                    />
                    <View style={activitiesStyles.activityInfo}>
                      <Text style={activitiesStyles.activityTitle}>{activity.title}</Text>
                      <Text style={activitiesStyles.activityDescription}>
                        {activity.description}
                      </Text>
                      <View style={activitiesStyles.activityMeta}>
                        <Text style={[
                          activitiesStyles.difficulty,
                          getDifficultyColor(activity.difficulty)
                        ]}>
                          {getDifficultyText(activity.difficulty)}
                        </Text>
                        <Text style={activitiesStyles.category}>{activity.section}</Text>
                      </View>
                      <Text style={activitiesStyles.professorName}>
                        Prof. {activity.professor.name}
                      </Text>
                    </View>
                  </View>
                  <View style={activitiesStyles.activityFooter}>
                    <View style={activitiesStyles.rewardContainer}>
                      <Text style={activitiesStyles.rewardText}>{activity.xavicoints} XaviCoins</Text>
                    </View>
                    <TouchableOpacity style={activitiesStyles.actionButton}>
                      <Text style={activitiesStyles.actionButtonText}>Comenzar</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default ActivitiesPage; 