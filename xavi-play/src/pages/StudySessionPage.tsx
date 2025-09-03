import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { StudyTimer } from '@/components/study/StudyTimer';
import { StudyCard } from '@/components/study/StudyCard';
import { InactivityAlert } from '@/components/study/InactivityAlert';
import { useStudyStore } from '@/store/studyStore';
import { useStudyAppState } from '@/hooks/useStudyAppState';
import { studyStyles } from '@/styles/study.styles';
import { StudyNavigationParams } from '@/types/StudyTypes';
import { RootStackParamList } from '@/types/navigation';

type StudySessionRouteProp = RouteProp<RootStackParamList, 'StudySession'>;
type StudySessionNavigationProp = StackNavigationProp<RootStackParamList>;

const StudySessionPage: React.FC = () => {
  const navigation = useNavigation<StudySessionNavigationProp>();
  const route = useRoute<StudySessionRouteProp>();
  const { deckCategory, deckMathTopic, sessionGoal } = route.params;

  const {
    currentCard,
    currentDeck,
    sessionTimer,
    isTimerRunning,
    activeSession,
    ankiState,
    showInactivityAlert,
    setShowInactivityAlert,
    showAnswer,
    nextCard,
    recordCardStudy,
    finishStudySession,
    cancelSession,
    error
  } = useStudyStore();

  const { isAppActive, startTimer } = useStudyAppState();
  const [sessionStarted, setSessionStarted] = useState(false);

  // Iniciar timer cuando se monta el componente
  useEffect(() => {
    if (activeSession && !sessionStarted && isAppActive) {
      startTimer();
      setSessionStarted(true);
    }
  }, [activeSession, sessionStarted, isAppActive, startTimer]);

  // Manejar botón de back del dispositivo
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        handleExitSession();
        return true; // Prevenir navegación automática
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const handleExitSession = () => {
    Alert.alert(
      '⚡ Salir de la sesión',
      'Si sales ahora, perderás todo el progreso y no ganarás XaviCoins. ¿Estás seguro?',
      [
        {
          text: 'Continuar estudiando',
          style: 'cancel'
        },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            await cancelSession();
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleAnswerDifficulty = async (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    if (!currentCard) return;

    // Registrar el estudio de la tarjeta
    await recordCardStudy(currentCard.id, difficulty);

    // Avanzar a la siguiente tarjeta
    nextCard(difficulty);

    // Verificar si se completó el mazo
    if (ankiState.currentCardIndex + 1 >= currentDeck.length) {
      handleSessionComplete();
    }
  };

  const handleSessionComplete = async () => {
    const cardsStudied = ankiState.cardHistory.length;
    const timeStudied = Math.floor(sessionTimer / 60); // minutos

    try {
      await finishStudySession(cardsStudied);
      
      navigation.replace('StudyResults', {
        sessionId: activeSession?.id || 0,
        rewards: {
          xavicoins: calculateXavicoins(timeStudied, cardsStudied),
          timeBonus: timeStudied >= sessionGoal,
          cardsBonus: cardsStudied * 2
        },
        statistics: {
          cardsStudied,
          timeSpent: timeStudied,
          correctAnswers: ankiState.cardHistory.filter(h => h.difficulty === 'good' || h.difficulty === 'easy').length
        }
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Hubo un problema al completar la sesión. Inténtalo de nuevo.',
        [{ text: 'OK' }]
      );
    }
  };

  const calculateXavicoins = (minutes: number, cardsStudied: number): number => {
    let total = 0;
    
    // Recompensa por tiempo
    if (minutes >= 10) total += 10;
    if (minutes >= 15) total += 5;
    if (minutes >= 20) total += 10;
    if (minutes >= 30) total += 15;
    
    // Recompensa por tarjetas
    total += cardsStudied * 2;
    
    // Bonus por cumplir meta
    if (minutes >= sessionGoal) {
      total += Math.floor(sessionGoal / 5);
    }
    
    return total;
  };

  // Si no hay sesión activa, mostrar mensaje de carga
  if (!activeSession) {
    return (
      <ScreenWrapper>
        <View style={studyStyles.resultsContainer}>
          <Text style={studyStyles.resultsIcon}>📚</Text>
          <Text style={studyStyles.resultsTitle}>
            Iniciando sesión...
          </Text>
          <Text style={studyStyles.resultsSubtitle}>
            Preparando tu sesión de estudio
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  // Si no hay tarjeta actual, mostrar completado
  if (!currentCard) {
    return (
      <ScreenWrapper>
        <View style={studyStyles.resultsContainer}>
          <Text style={studyStyles.resultsIcon}>🎉</Text>
          <Text style={studyStyles.resultsTitle}>
            ¡Mazo Completado!
          </Text>
          <Text style={studyStyles.resultsSubtitle}>
            Has estudiado todas las tarjetas disponibles
          </Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <PokemonHeader 
        title="Sesión de Estudio" 
        showBackButton 
        onBackPress={handleExitSession}
      />
      
      {error && (
        <View style={studyStyles.errorContainer}>
          <Text style={studyStyles.errorText}>{error}</Text>
        </View>
      )}

      <StudyTimer
        timer={sessionTimer}
        goal={sessionGoal}
        isRunning={isTimerRunning && isAppActive}
      />

      <StudyCard
        card={currentCard}
        isShowingAnswer={ankiState.isShowingAnswer}
        currentIndex={ankiState.currentCardIndex}
        totalCards={currentDeck.length}
        onShowAnswer={showAnswer}
        onAnswerDifficulty={handleAnswerDifficulty}
      />

      {!isAppActive && (
        <View style={[studyStyles.errorContainer, { backgroundColor: '#fef3c7', borderColor: '#f59e0b' }]}>
          <Text style={[studyStyles.errorText, { color: '#f59e0b' }]}>
            ⚡ La aplicación debe permanecer activa para ganar XaviCoins
          </Text>
        </View>
      )}

      <InactivityAlert
        isVisible={showInactivityAlert}
        onDismiss={() => setShowInactivityAlert(false)}
        onRestartSession={() => {
          setShowInactivityAlert(false);
          // Aquí podrías reiniciar la sesión si es necesario
          navigation.goBack();
        }}
      />
    </ScreenWrapper>
  );
};

export default StudySessionPage;
