import React from 'react';
import { Modal, View, Text, ActivityIndicator } from 'react-native';
import { createUserStyles } from '@/styles/createUser.styles';

interface Props {
  visible: boolean;
}

export const CreatingOverlay: React.FC<Props> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={createUserStyles.overlayContainer}>
        <View style={createUserStyles.overlayCard}>
          <ActivityIndicator size="large" color="#fbbf24" />
          <Text style={createUserStyles.overlayText}>Creando usuario...
          </Text>
          <Text style={createUserStyles.overlaySubText}>Esto puede tardar unos segundos</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CreatingOverlay;

