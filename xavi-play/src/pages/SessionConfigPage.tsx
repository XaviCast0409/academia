import React, { useState } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { SessionConfig } from '@/components/study/SessionConfig';
import { useStudyStore } from '@/store/studyStore';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type SessionConfigRouteProp = RouteProp<RootStackParamList, 'SessionConfig'>;
type SessionConfigNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: SessionConfigRouteProp;
};

const SessionConfigPage: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<SessionConfigNavigationProp>();
  const { category, mathTopic, displayName, cardCount, totalXavicoins, description, icon } = route.params;
  const [isStarting, setIsStarting] = useState(false);
  const { startStudySession } = useStudyStore();

  return (
    <ScreenWrapper>
      <PokemonHeader title="Configurar Sesión" showBackButton onBackPress={() => navigation.goBack()} />
      <View style={{ padding: 12 }}>
        {isStarting ? (
          <View style={{ alignItems: 'center', padding: 24 }}>
            <ActivityIndicator size="large" color="#fbbf24" />
            <Text style={{ marginTop: 12, color: '#374151' }}>Iniciando sesión de estudio...</Text>
          </View>
        ) : (
          <SessionConfig
            deck={{
              category,
              mathTopic,
              displayName,
              cardCount,
              avgDifficulty: 'basico',
              totalXavicoins: totalXavicoins || 0,
              description: description || '',
              icon: icon || '🎒',
              color: '#ffffff',
              courseId: route.params.courseId,
              subTopicId: route.params.subTopicId
            }}
            onStartSession={async (minutes) => {
              setIsStarting(true);
              try {
                await startStudySession(category, mathTopic, minutes);
                // Replace stack with StudySession so back button doesn't return to config
                navigation.replace('StudySession', { deckCategory: category, deckMathTopic: mathTopic, sessionGoal: minutes });
              } catch (err: any) {
                Alert.alert('Error', err?.message || 'No se pudo iniciar la sesión');
              } finally {
                setIsStarting(false);
              }
            }}
            onCancel={() => navigation.goBack()}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default SessionConfigPage;
