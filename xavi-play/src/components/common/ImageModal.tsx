import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, ScrollView, Image } from 'react-native';
import { imageModalStyles } from '@/styles/imageModal.styles';

interface ImageModalProps {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  images,
  initialIndex = 0,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  console.log('ImageModal render - visible:', visible, 'images.length:', images.length);

  if (!visible || images.length === 0) return null;

  console.log('Current image URL:', images[currentIndex]);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentIndex(index);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={imageModalStyles.overlay}>
        {/* Header con controles */}
        <View style={imageModalStyles.header}>
          <TouchableOpacity style={imageModalStyles.closeButton} onPress={onClose}>
            <Text style={imageModalStyles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          {images.length > 1 && (
            <Text style={imageModalStyles.counter}>
              {currentIndex + 1} / {images.length}
            </Text>
          )}
        </View>

        {/* Contenedor de imagen con zoom nativo */}
        <View style={imageModalStyles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScrollEnd}
            style={imageModalStyles.scrollView}
          >
            {images.map((image, index) => (
              <View key={index} style={imageModalStyles.imageWrapper}>
                <ScrollView
                  style={imageModalStyles.zoomScrollView}
                  contentContainerStyle={imageModalStyles.zoomContentContainer}
                  maximumZoomScale={3.0}
                  minimumZoomScale={0.5}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  bouncesZoom={false}
                >
                  <Image
                    source={{ uri: image }}
                    style={imageModalStyles.zoomImage}
                    resizeMode="contain"
                    onError={(error) => console.log('Image error:', error)}
                    onLoad={() => console.log('Image loaded successfully')}
                  />
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Controles de navegación */}
        {images.length > 1 && (
          <View style={imageModalStyles.navigation}>
            <TouchableOpacity
              style={[
                imageModalStyles.navButton,
                currentIndex === 0 && imageModalStyles.navButtonDisabled
              ]}
              onPress={handlePrevious}
              disabled={currentIndex === 0}
            >
              <Text style={imageModalStyles.navButtonText}>‹</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                imageModalStyles.navButton,
                currentIndex === images.length - 1 && imageModalStyles.navButtonDisabled
              ]}
              onPress={handleNext}
              disabled={currentIndex === images.length - 1}
            >
              <Text style={imageModalStyles.navButtonText}>›</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Indicadores de puntos */}
        {images.length > 1 && (
          <View style={imageModalStyles.indicators}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  imageModalStyles.indicator,
                  index === currentIndex && imageModalStyles.indicatorActive
                ]}
              />
            ))}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ImageModal; 