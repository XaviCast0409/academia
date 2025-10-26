import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { DeckCard } from '@/components/study/DeckCard';
import { useStudyStore } from '@/store/studyStore';
import { studyService } from '@/services/studyService';
import { studyStyles } from '@/styles/study.styles';
import { StudyDeck } from '@/types/StudyTypes';
import { RootStackParamList } from '@/types/navigation';

type StudyDecksNavigationProp = StackNavigationProp<RootStackParamList>;

const StudyDecksPage: React.FC = () => {
  const navigation = useNavigation<StudyDecksNavigationProp>();
  
  
  const {
    decks,
    isLoading,
    error,
    loadDecks,
    startStudySession,
    clearError
  } = useStudyStore();

  useEffect(() => {
    // loadDecks remains for backwards compatibility, but prefer backend courses
    (async () => {
      try {
        await loadDecks();
      } catch (_) {}
    })();
  }, [loadDecks]);

  // New: load courses from backend (includes subtopics and counts)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const courses = await studyService.getCourses();
        if (!mounted) return;
        // Map backend courses into a list of courses each with subtopics
        const mappedCourses: { id: string | number; name: string; icon?: string; color?: string; subtopics: StudyDeck[] }[] = [];
        courses.forEach((course: any) => {
          const subs = Array.isArray(course.subTopics) ? course.subTopics : [];
          const mappedSubs: StudyDeck[] = subs.map((sub: any) => ({
            category: String(course.id),
            mathTopic: String(sub.id),
            displayName: `${course.name} - ${sub.name}`,
            cardCount: Array.isArray(sub.studyCards) ? sub.studyCards.length : 0,
            avgDifficulty: 'basico',
            totalXavicoins: 0,
            description: sub.description || course.description || '',
            icon: course.icon || '🎒',
            color: course.color || '#fbbf24',
            courseId: course.id,
            subTopicId: sub.id
          }));

          mappedCourses.push({ id: course.id, name: course.name, icon: course.icon, color: course.color, subtopics: mappedSubs });
        });

        // If backend returned no courses/subtopics, fallback to store decks grouping
        if (mappedCourses.length === 0) {
          const map = new Map<string | number, { id: string | number; name: string; icon?: string; color?: string; subtopics: StudyDeck[] }>();
          decks.forEach((d) => {
            const courseId = d.courseId || d.category;
            const courseName = d.displayName ? String(d.displayName).split(' - ')[0] : 'Curso';

            if (!map.has(courseId)) {
              map.set(courseId, { id: courseId, name: courseName, icon: d.icon, color: d.color, subtopics: [] });
            }
            map.get(courseId)!.subtopics.push(d);
          });

          const fallbackCourses = Array.from(map.values());
          setCourses(fallbackCourses);
        } else {
          setCourses(mappedCourses);
        }
      } catch (err) {
        // ignore; fallback to existing decks loaded earlier
        console.warn('Error cargando courses desde backend', err);
      }
    })();
    return () => { mounted = false; };
  }, [loadDecks]);

  // deck press now handled inside subtopics page; courses list only navigates to CourseSubtopics
  const handleDeckPress = (deck: StudyDeck) => {
    if (deck.cardCount === 0) {
      Alert.alert('Mazo vacío','Este mazo no tiene tarjetas disponibles para estudiar.', [{ text: 'OK' }]);
      return;
    }
    // fallback navigation directly to StudySession via session config screen
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

  // Local courses state holds courses + subtopics from backend or fallback
  const [coursesState, setCourses] = useState<{ id: string | number; name: string; icon?: string; color?: string; subtopics: StudyDeck[] }[]>([]);

  const [expandedCourseId, setExpandedCourseId] = useState<string | number | null>(null);

  const toggleCourse = (courseId: string | number) => {
    setExpandedCourseId(prev => prev === courseId ? null : courseId);
  };

  const handleCoursePress = (course: { id: string | number; name: string }) => {
    // navigate to subtopics page for this course
    navigation.navigate('CourseSubtopics', { courseId: Number(course.id), courseName: course.name });
  };

  const renderDeck = ({ item }: { item: StudyDeck }) => (
    <DeckCard
      deck={item}
      onPress={() => handleDeckPress(item)}
    />
  );

  const renderCourse = ({ item }: { item: { id: string | number; name: string; icon?: string; color?: string; subtopics: StudyDeck[] } }) => {
    const totalCards = item.subtopics.reduce((s, d) => s + (d.cardCount || 0), 0);

    return (
      <View style={{ marginBottom: 12 }}>
        <TouchableOpacity onPress={() => toggleCourse(item.id)} style={{ padding: 12, backgroundColor: '#fff', borderRadius: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.icon ? `${item.icon} ` : ''}{item.name}</Text>
              <Text style={{ color: '#6b7280' }}>{item.subtopics.length} subtema(s) · {totalCards} tarjeta(s)</Text>
            </View>
            <Text style={{ fontSize: 18 }}>{expandedCourseId === item.id ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>

        {expandedCourseId === item.id && (
          <View style={{ marginTop: 8 }}>
            {item.subtopics.map((s) => (
              <View key={`${s.courseId}-${s.subTopicId || s.mathTopic}`} style={{ marginBottom: 8 }}>
                {renderDeck({ item: s })}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

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

  // no inline session config here - use dedicated SessionConfig route

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
            data={coursesState}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8, marginBottom: 8 }}
            renderItem={({ item }: { item: { id: string | number; name: string; icon?: string; color?: string; subtopics: StudyDeck[] } }) => {
              const totalCards = item.subtopics.reduce((s, d) => s + (d.cardCount || 0), 0);
              return (
                <TouchableOpacity
                  onPress={() => handleCoursePress(item)}
                  activeOpacity={0.9}
                  style={[studyStyles.deckCard, { width: '48%', paddingVertical: 14, paddingHorizontal: 12 } as any]}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: '#FFF7E6', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
                      <Text style={{ fontSize: 20 }}>{'🎒'}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={2} style={[studyStyles.deckTitle, { fontSize: 15 }]}>{item.name}</Text>
                      <Text style={[studyStyles.deckDescription, { marginTop: 6, fontSize: 13 }]}>{item.subtopics.length} subtema(s)</Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={studyStyles.deckStat}>
                      <Text style={studyStyles.deckStatValue}>{totalCards}</Text>
                      <Text style={studyStyles.deckStatLabel}>tarjetas</Text>
                    </View>
                    <Text style={[studyStyles.deckStatLabel, { color: '#6b7280' }]}>Ver subtemas</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item: any) => String(item.id)}
            contentContainerStyle={[
              studyStyles.scrollContent,
              coursesState.length === 0 ? { flex: 1 } : undefined
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
