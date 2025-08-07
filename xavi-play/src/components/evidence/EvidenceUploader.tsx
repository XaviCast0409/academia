import { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { evidenceUploaderStyles } from '@/styles/evidenceUploader.styles';
import evidenceService from '@/services/evidenceService';
import cloudinaryService from '@/services/cloudinaryService';
import { useAuthStore } from '@/store/authStore';

interface EvidenceUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  resetUploader: number;
  activityId: number;
  maxFiles?: number;
}

const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onUploadComplete,
  resetUploader,
  activityId,
  maxFiles = 5,
}) => {
  const { user } = useAuthStore();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImages = useCallback((images: string[]): boolean => {
    if (images.length > maxFiles) {
      setError(`Máximo ${maxFiles} imágenes permitidas`);
      return false;
    }
    return true;
  }, [maxFiles]);

  const handleImagePicker = async () => {
    try {
      setError(null);
      
      // Solicitar permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Necesitamos acceso a tu galería para seleccionar imágenes.'
        );
        return;
      }

      // Abrir selector de imágenes
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        const totalImages = selectedImages.length + newImages.length;
        
        if (!validateImages([...selectedImages, ...newImages])) {
          return;
        }

        setSelectedImages(prev => [...prev, ...newImages]);
        setIsUploaded(false);
      }
    } catch (error) {
      console.error('Error selecting images:', error);
      setError('Error al seleccionar imágenes');
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setIsUploaded(false);
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0 || !user) return;

    setIsUploading(true);
    setIsUploaded(false);
    setError(null);

    try {
      console.log('EvidenceUploader: Starting upload process...');
      
      // Primero subir las imágenes a Cloudinary
      console.log('EvidenceUploader: Uploading images to Cloudinary...');
      const uploadedImageUrls = await cloudinaryService.uploadMultipleImages(selectedImages);
      
      console.log('EvidenceUploader: Images uploaded to Cloudinary:', uploadedImageUrls);

      // Luego crear la evidencia en el backend con las URLs de Cloudinary
      const evidenceData = {
        activityId,
        userId: parseInt(user.id),
        images: uploadedImageUrls,
        description: `Evidencia enviada para la actividad ${activityId}`,
      };

      console.log('EvidenceUploader: Sending evidence data to backend:', evidenceData);
      
      const evidence = await evidenceService.createEvidence(evidenceData);
      
      console.log('EvidenceUploader: Evidence created successfully:', evidence);
      
      setIsUploaded(true);
      onUploadComplete(evidence.images);
      
      Alert.alert(
        'Éxito',
        'Evidencias enviadas correctamente. El profesor las revisará pronto.',
        [{ text: 'OK' }]
      );
    } catch (error: any) {
      const errorMessage = error.message || 'Error al enviar las evidencias. Por favor, intente nuevamente.';
      setError(errorMessage);
      console.error('Upload error:', error);
      
      Alert.alert(
        'Error',
        errorMessage,
        [{ text: 'OK' }]
      );
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setSelectedImages([]);
    setIsUploading(false);
    setIsUploaded(false);
    setError(null);
  }, [resetUploader]);

  return (
    <View style={evidenceUploaderStyles.container}>
      {/* Título */}
      <Text style={evidenceUploaderStyles.title}>Enviar Evidencias</Text>
      
      {/* Botón de selección */}
      <TouchableOpacity
        style={evidenceUploaderStyles.selectButton}
        onPress={handleImagePicker}
        disabled={isUploading}
      >
        <Text style={evidenceUploaderStyles.selectButtonText}>
          📷 Seleccionar Imágenes
        </Text>
      </TouchableOpacity>

      {/* Contador de imágenes */}
      {selectedImages.length > 0 && (
        <View style={evidenceUploaderStyles.counterContainer}>
          <Text style={evidenceUploaderStyles.counterText}>
            {selectedImages.length} imagen{selectedImages.length > 1 ? 'es' : ''} seleccionada{selectedImages.length > 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* Previsualización de imágenes */}
      {selectedImages.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={evidenceUploaderStyles.previewContainer}
        >
          {selectedImages.map((uri, index) => (
            <View key={index} style={evidenceUploaderStyles.imageContainer}>
              <Image
                source={{ uri }}
                style={evidenceUploaderStyles.previewImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={evidenceUploaderStyles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Text style={evidenceUploaderStyles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Botón de envío */}
      {selectedImages.length > 0 && (
        <TouchableOpacity
          style={[
            evidenceUploaderStyles.uploadButton,
            isUploading && evidenceUploaderStyles.uploadButtonDisabled
          ]}
          onPress={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text style={evidenceUploaderStyles.uploadButtonText}>
              📤 Enviar Evidencias
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Mensaje de éxito */}
      {isUploaded && (
        <View style={evidenceUploaderStyles.successContainer}>
          <Text style={evidenceUploaderStyles.successText}>
            ✅ Evidencias enviadas correctamente
          </Text>
        </View>
      )}

      {/* Mensaje de error */}
      {error && (
        <View style={evidenceUploaderStyles.errorContainer}>
          <Text style={evidenceUploaderStyles.errorText}>
            ❌ {error}
          </Text>
        </View>
      )}
    </View>
  );
};

export default EvidenceUploader; 