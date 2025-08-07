import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import ImageModal from '@/components/common/ImageModal';
import EvidenceSection from '@/components/evidence/EvidenceSection';
import { activityDetailsStyles } from '@/styles/activityDetails.styles';
import activityService from '@/services/activityService';
import { Activity } from '@/types/activity';

interface RouteParams {
  activityId: number;
}

const ActivityDetailsPage: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { activityId } = route.params as RouteParams;

  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    loadActivityDetails();
    // Reset modal state when activity changes
    setImageModalVisible(false);
    setSelectedImageIndex(0);
  }, [activityId]);

  const loadActivityDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const activityData = await activityService.getActivityDetails(activityId);
      setActivity(activityData);
    } catch (error: any) {
      setError(error.message || 'Error al cargar los detalles de la actividad');
      Alert.alert('Error', 'No se pudieron cargar los detalles de la actividad');
    } finally {
      setLoading(false);
    }
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

  const handleImagePress = (index: number) => {
    console.log('ActivityDetailsPage - handleImagePress called with index:', index);
    console.log('ActivityDetailsPage - activity.images:', activity?.images);
    setSelectedImageIndex(index);
    setImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setImageModalVisible(false);
  };

  const handleEvidenceSubmitted = (urls: string[]) => {
    console.log('Evidence submitted for activity:', activityId, urls);
    Alert.alert(
      'Evidencias Enviadas',
      'Tus evidencias han sido enviadas correctamente. El profesor las revisará pronto.',
      [
        { 
          text: 'OK',
          onPress: () => {
            // Navegar de regreso a la lista de actividades
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <PokemonHeader title="Detalles de Actividad" />
        <View style={activityDetailsStyles.loadingContainer}>
          <Text style={activityDetailsStyles.loadingText}>Cargando detalles...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (error || !activity) {
    return (
      <ScreenWrapper>
        <PokemonHeader title="Detalles de Actividad" />
        <View style={activityDetailsStyles.errorContainer}>
          <Text style={activityDetailsStyles.errorText}>
            {error || 'No se pudo cargar la actividad'}
          </Text>
          <TouchableOpacity style={activityDetailsStyles.retryButton} onPress={loadActivityDetails}>
            <Text style={activityDetailsStyles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <PokemonHeader title="Detalles de Actividad" />
      <ScrollView
        style={activityDetailsStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={activityDetailsStyles.activityCard}>
          {/* Header sin imagen principal */}
          <View style={activityDetailsStyles.headerSection}>
            <View style={activityDetailsStyles.headerInfo}>
              <Text style={activityDetailsStyles.title}>{activity.title}</Text>
              <View style={activityDetailsStyles.metaInfo}>
                <Text style={[
                  activityDetailsStyles.difficulty,
                  getDifficultyColor(activity.difficulty)
                ]}>
                  {getDifficultyText(activity.difficulty)}
                </Text>
                <Text style={activityDetailsStyles.section}>{activity.section}</Text>
              </View>
            </View>
          </View>

          {/* Descripción */}
          <View style={activityDetailsStyles.descriptionSection}>
            <Text style={activityDetailsStyles.sectionTitle}>Descripción</Text>
            <Text style={activityDetailsStyles.description}>{activity.description}</Text>
          </View>

          {/* Galería de imágenes */}
          <View style={activityDetailsStyles.gallerySection}>
            <Text style={activityDetailsStyles.sectionTitle}>
              {activity.images.length > 1 ? 'Galería de Imágenes' : 'Imagen de la Actividad'}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={activityDetailsStyles.galleryContainer}
            >
              {activity.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(index)}
                  style={activityDetailsStyles.galleryImageContainer}
                >
                  <Image
                    source={{ uri: image }}
                    style={activityDetailsStyles.galleryImage}
                  />
                  <View style={activityDetailsStyles.imageOverlay}>
                    <Text style={activityDetailsStyles.zoomIcon}>🔍</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Información del profesor */}
          <View style={activityDetailsStyles.professorSection}>
            <Text style={activityDetailsStyles.sectionTitle}>Profesor Responsable</Text>
            <View style={activityDetailsStyles.professorCard}>
              <View style={activityDetailsStyles.professorAvatar}>
                <Text style={activityDetailsStyles.professorInitial}>
                  {activity.professor.name.charAt(0)}
                </Text>
              </View>
              <View style={activityDetailsStyles.professorInfo}>
                <Text style={activityDetailsStyles.professorName}>{activity.professor.name}</Text>
                <Text style={activityDetailsStyles.professorEmail}>{activity.professor.email}</Text>
              </View>
            </View>
          </View>

          {/* Recompensa */}
          <View style={activityDetailsStyles.rewardSection}>
            <Text style={activityDetailsStyles.sectionTitle}>Recompensa</Text>
            <View style={activityDetailsStyles.rewardCard}>
              <Text style={activityDetailsStyles.rewardAmount}>{activity.xavicoints}</Text>
              <Text style={activityDetailsStyles.rewardLabel}>XaviCoins</Text>
            </View>
          </View>

          {/* Sección de Evidencias */}
          <EvidenceSection
            activityId={activityId}
            onEvidenceSubmitted={handleEvidenceSubmitted}
            maxFiles={5}
          />
        </View>
      </ScrollView>

      {/* Modal de imágenes */}
      <ImageModal
        key={`activity-${activityId}`}
        visible={imageModalVisible}
        images={activity.images}
        initialIndex={selectedImageIndex}
        onClose={handleCloseImageModal}
      />
    </ScreenWrapper>
  );
};

export default ActivityDetailsPage; 