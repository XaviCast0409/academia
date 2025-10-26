import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { DeckCard } from '@/components/study/DeckCard';
import { StudyDeck } from '@/types/StudyTypes';
import { RootStackParamList } from '@/types/navigation';
import { studyService } from '@/services/studyService';
import { studyStyles } from '@/styles/study.styles';

type CourseSubtopicsRouteProp = RouteProp<RootStackParamList, 'CourseSubtopics'>;
type CourseSubtopicsNavigationProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: CourseSubtopicsRouteProp;
};

const CourseSubtopicsPage: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<CourseSubtopicsNavigationProp>();
  const { courseId, courseName } = route.params;
  const [subtopics, setSubtopics] = useState<StudyDeck[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const resp = await studyService.getCourses();
        // find course in resp
        const course = Array.isArray(resp) ? resp.find((c: any) => Number(c.id) === Number(courseId)) : null;
        const subs = course && Array.isArray(course.subTopics) ? course.subTopics : [];
        const mapped = subs.map((sub: any) => ({
          category: String(courseId),
          mathTopic: String(sub.id),
          displayName: `${courseName} - ${sub.name}`,
          cardCount: Array.isArray(sub.studyCards) ? sub.studyCards.length : 0,
          avgDifficulty: 'basico',
          totalXavicoins: 0,
          description: sub.description || '',
          icon: course?.icon || '🎒',
          color: course?.color || '#fbbf24',
          courseId: courseId,
          subTopicId: sub.id
        } as StudyDeck));

        if (!mounted) return;
        setSubtopics(mapped);
      } catch (err: any) {
        console.warn('Error cargando subtopics', err);
        Alert.alert('Error', 'No se pudieron cargar los subtemas');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [courseId]);

  const handleDeckPress = (deck: StudyDeck) => {
    if (deck.cardCount === 0) {
      Alert.alert('Mazo vacío', 'Este mazo no tiene tarjetas disponibles.');
      return;
    }

    // Navigate to dedicated SessionConfig page
    navigation.navigate('SessionConfig', {
      category: deck.category,
      mathTopic: deck.mathTopic,
      displayName: deck.displayName,
      cardCount: deck.cardCount,
      totalXavicoins: deck.totalXavicoins,
      description: deck.description,
      icon: deck.icon,
      courseId: deck.courseId,
      subTopicId: deck.subTopicId
    });
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <PokemonHeader title={courseName} />
        <View style={studyStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#fbbf24" />
          <Text style={studyStyles.loadingText}>Cargando subtemas...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <PokemonHeader title={courseName} />
      <View style={studyStyles.container}>
        <FlatList
          data={subtopics}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 8 }}>
              <DeckCard deck={item} onPress={() => handleDeckPress(item)} />
            </View>
          )}
          keyExtractor={(item) => `${item.courseId}-${item.subTopicId}`}
          ListEmptyComponent={() => (
            <View style={studyStyles.emptyState}>
              <Text style={studyStyles.emptyStateIcon}>📚</Text>
              <Text style={studyStyles.emptyStateTitle}>No hay subtemas</Text>
              <Text style={studyStyles.emptyStateText}>Este curso no tiene subtemas disponibles.</Text>
            </View>
          )}
        />
      </View>

  {/* navigation handles session config now via dedicated screen */}
    </ScreenWrapper>
  );
};

export default CourseSubtopicsPage;
