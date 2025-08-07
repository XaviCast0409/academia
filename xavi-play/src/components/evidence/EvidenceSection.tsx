import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import EvidenceUploader from './EvidenceUploader';
import { evidenceSectionStyles } from '@/styles/evidenceSection.styles';

interface EvidenceSectionProps {
  activityId: number;
  onEvidenceSubmitted?: (urls: string[]) => void;
  maxFiles?: number;
}

const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  activityId,
  onEvidenceSubmitted,
  maxFiles = 5,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [resetUploader, setResetUploader] = useState(0);

  const handleUploadComplete = (urls: string[]) => {
    console.log('Evidence uploaded:', urls);
    onEvidenceSubmitted?.(urls);
    // Reset uploader after successful upload
    setResetUploader(prev => prev + 1);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={evidenceSectionStyles.container}>
      {/* Header */}
      <TouchableOpacity
        style={evidenceSectionStyles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <Text style={evidenceSectionStyles.title}>
          📤 Enviar Evidencias
        </Text>
        <Text style={evidenceSectionStyles.expandIcon}>
          {isExpanded ? '▼' : '▶'}
        </Text>
      </TouchableOpacity>

      {/* Content */} 
      {isExpanded && (
        <View style={evidenceSectionStyles.content}>
          <Text style={evidenceSectionStyles.description}>
            Sube fotos de tu evidencia para completar esta actividad
          </Text>

          <EvidenceUploader
            onUploadComplete={handleUploadComplete}
            resetUploader={resetUploader}
            activityId={activityId}
            maxFiles={maxFiles}
          />
        </View>
      )}
    </View>
  );
};

export default EvidenceSection; 