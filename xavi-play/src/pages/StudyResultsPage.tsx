import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import { studyStyles } from '@/styles/study.styles';
import { RootStackParamList } from '@/types/navigation';

type StudyResultsRouteProp = RouteProp<RootStackParamList, 'StudyResults'>;
type StudyResultsNavigationProp = StackNavigationProp<RootStackParamList>;

const StudyResultsPage: React.FC = () => {
  const navigation = useNavigation<StudyResultsNavigationProp>();
  const route = useRoute<StudyResultsRouteProp>();
  const { rewards, statistics } = route.params;

  const handleContinue = () => {
    // Regresar a la página de mazos
    navigation.navigate('StudyDecks');
  };

  const handleGoToProfile = () => {
    // Ir al perfil para ver las estadísticas actualizadas
    navigation.navigate('Main');
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getPerformanceMessage = (): string => {
    const accuracy = statistics.cardsStudied > 0 
      ? (statistics.correctAnswers / statistics.cardsStudied) * 100 
      : 0;

    if (accuracy >= 80) return '🌟 ¡Excelente trabajo!';
    if (accuracy >= 60) return '👍 ¡Buen progreso!';
    if (accuracy >= 40) return '⚡ Sigue practicando';
    return '💪 ¡No te rindas!';
  };

  return (
    <ScreenWrapper>
      <View style={studyStyles.resultsContainer}>
        <Text style={studyStyles.resultsIcon}>🎉</Text>
        
        <Text style={studyStyles.resultsTitle}>
          ¡Sesión Completada!
        </Text>
        
        <Text style={studyStyles.resultsSubtitle}>
          {getPerformanceMessage()}
        </Text>

        {/* Resumen de la sesión */}
        <View style={studyStyles.rewardCard}>
          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>Tiempo estudiado:</Text>
            <Text style={studyStyles.rewardValue}>
              {formatTime(statistics.timeSpent)}
            </Text>
          </View>
          
          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>Tarjetas estudiadas:</Text>
            <Text style={studyStyles.rewardValue}>
              {statistics.cardsStudied}
            </Text>
          </View>
          
          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>Respuestas correctas:</Text>
            <Text style={studyStyles.rewardValue}>
              {statistics.correctAnswers}
            </Text>
          </View>

          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>Precisión:</Text>
            <Text style={studyStyles.rewardValue}>
              {statistics.cardsStudied > 0 
                ? Math.round((statistics.correctAnswers / statistics.cardsStudied) * 100)
                : 0}%
            </Text>
          </View>
        </View>

        {/* Recompensas ganadas */}
        <View style={studyStyles.rewardCard}>
          <Text style={[studyStyles.rewardLabel, { fontSize: 16, marginBottom: 12 }]}>
            🏆 Recompensas Ganadas
          </Text>
          
          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>XaviCoins por tiempo:</Text>
            <Text style={studyStyles.rewardValue}>
              +{rewards.xavicoins - rewards.cardsBonus}
            </Text>
          </View>
          
          <View style={studyStyles.rewardRow}>
            <Text style={studyStyles.rewardLabel}>XaviCoins por tarjetas:</Text>
            <Text style={studyStyles.rewardValue}>
              +{rewards.cardsBonus}
            </Text>
          </View>

          {rewards.timeBonus && (
            <View style={studyStyles.rewardRow}>
              <Text style={studyStyles.rewardLabel}>🎯 Bonus por meta:</Text>
              <Text style={[studyStyles.rewardValue, { color: '#10b981' }]}>
                ¡Cumplida!
              </Text>
            </View>
          )}

          <View style={[studyStyles.rewardRow, studyStyles.rewardTotal]}>
            <Text style={[studyStyles.rewardLabel, { fontWeight: 'bold', fontSize: 16 }]}>
              Total XaviCoins:
            </Text>
            <Text style={studyStyles.rewardTotalValue}>
              +{rewards.xavicoins}
            </Text>
          </View>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity
          style={studyStyles.actionButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={studyStyles.actionButtonText}>
            🎒 Estudiar Otro Mazo
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[studyStyles.actionButton, studyStyles.actionButtonSecondary]}
          onPress={handleGoToProfile}
          activeOpacity={0.8}
        >
          <Text style={[studyStyles.actionButtonText, studyStyles.actionButtonTextSecondary]}>
            👤 Ver Mi Perfil
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default StudyResultsPage;
