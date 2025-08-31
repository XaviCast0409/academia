import { useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { useRealtimeNotifications } from '@/hooks/useRealtimeNotifications';
import Pagination from '@/components/common/Pagination';
import { evidencesStyles } from '@/styles/evidences.styles';
import { useAuthStore } from '@/store/authStore';
import { useEvidenceStore } from '@/store/evidenceStore';
import { Evidence } from '@/types/evidence';

const EvidencesPage: React.FC = () => {
  useRealtimeNotifications();
  const { user } = useAuthStore();
  const { 
    evidences, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    loadEvidences 
  } = useEvidenceStore();

  useEffect(() => {
    if (user) {
      loadEvidences(parseInt(user.id)).catch((error) => {
        Alert.alert('Error', 'No se pudieron cargar las evidencias');
        console.error('Error loading evidences:', error);
      });
    }
  }, [user, loadEvidences]);

  // Refrescar evidencias cuando la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      if (user) {
        console.log('EvidencesPage: Refreshing evidences on focus');
        loadEvidences(parseInt(user.id)).catch((error) => {
          console.error('Error refreshing evidences:', error);
        });
      }
    }, [user, loadEvidences])
  );

  const handlePageChange = (page: number) => {
    if (user) {
      loadEvidences(parseInt(user.id), page).catch((error) => {
        Alert.alert('Error', 'No se pudo cargar la página');
        console.error('Error loading page:', error);
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return { 
          container: evidencesStyles.statusPending, 
          text: evidencesStyles.statusTextPending 
        };
      case 'approved':
        return { 
          container: evidencesStyles.statusApproved, 
          text: evidencesStyles.statusTextApproved 
        };
      case 'rejected':
        return { 
          container: evidencesStyles.statusRejected, 
          text: evidencesStyles.statusTextRejected 
        };
      default:
        return { 
          container: evidencesStyles.statusPending, 
          text: evidencesStyles.statusTextPending 
        };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEvidenceCard = (evidence: Evidence) => {
    const statusStyles = getStatusColor(evidence.status);
    
    return (
      <View key={evidence.id} style={evidencesStyles.evidenceCard}>
        <View style={evidencesStyles.evidenceHeader}>
          <View style={evidencesStyles.activityInfo}>
            <Text style={evidencesStyles.activityTitle}>
              {evidence.activity?.title || 'Actividad no disponible'}
            </Text>
            <Text style={evidencesStyles.activityDescription}>
              {evidence.activity?.description || 'Sin descripción'}
            </Text>
            {evidence.activity?.professor && (
              <Text style={evidencesStyles.professorName}>
                Prof. {evidence.activity.professor.name}
              </Text>
            )}
          </View>
          <View style={[evidencesStyles.statusContainer, statusStyles.container]}>
            <Text style={[evidencesStyles.statusText, statusStyles.text]}>
              {getStatusText(evidence.status)}
            </Text>
          </View>
        </View>

        <View style={evidencesStyles.evidenceDetails}>
          <View style={evidencesStyles.dateContainer}>
            <Text style={evidencesStyles.dateText}>
              Enviada el {formatDate(evidence.createdAt)}
            </Text>
          </View>

          {evidence.filePath && evidence.filePath.length > 0 && (
            <View style={evidencesStyles.imagesContainer}>
              <Text style={evidencesStyles.imagesTitle}>
                Evidencias ({evidence.filePath.length} imagen{evidence.filePath.length !== 1 ? 'es' : ''})
              </Text>
              <View style={evidencesStyles.imagesGrid}>
                {evidence.filePath.map((imageUrl, index) => (
                  <View key={index} style={evidencesStyles.imageContainer}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={evidencesStyles.evidenceImage}
                      onError={(error) => console.log('Image error:', error)}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={evidencesStyles.emptyContainer}>
      <Text style={evidencesStyles.emptyIcon}>📤</Text>
      <Text style={evidencesStyles.emptyTitle}>No hay evidencias enviadas</Text>
      <Text style={evidencesStyles.emptyText}>
        Cuando envíes evidencias para completar actividades, aparecerán aquí con su estado de revisión.
      </Text>
    </View>
  );

  return (
    <ScreenWrapper>
      <PokemonHeader title="Mis Evidencias" />
      <ScrollView 
        style={evidencesStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {loading ? (
          <View style={evidencesStyles.loadingContainer}>
            <Text style={evidencesStyles.loadingText}>Cargando evidencias...</Text>
          </View>
        ) : error ? (
          <View style={evidencesStyles.errorContainer}>
            <Text style={evidencesStyles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={evidencesStyles.retryButton} 
              onPress={() => user && loadEvidences(parseInt(user.id))}
            >
              <Text style={evidencesStyles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>
          </View>
        ) : evidences.length === 0 ? (
          renderEmptyState()
        ) : (
          <>
            <View style={evidencesStyles.evidencesContainer}>
              {evidences.map(renderEvidenceCard)}
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

export default EvidencesPage; 