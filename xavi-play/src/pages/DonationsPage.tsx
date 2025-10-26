import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import ScreenWrapper from '@/components/common/ScreenWrapper';
import PokemonHeader from '@/components/common/PokemonHeader';
import { donationsStyles } from '../styles/donations.styles';
import { useAuthStore } from '@/store/authStore';

interface DonationOption {
  id: string;
  title: string;
  description: string;
  amount: number;
  icon: string;
  color: string;
}

const DonationsPage = () => {
  const { user } = useAuthStore();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const donationOptions: DonationOption[] = [
    {
      id: 'small',
      title: 'Donación Pequeña',
      description: 'el doble de xavicoins por 3 dias',
      amount: 5,
      icon: '☕',
      color: '#10b981'
    },
    {
      id: 'medium',
      title: 'Donación Media',
      description: 'el doble de xavicoins por 7 dias',
      amount: 10,
      icon: '🍕',
      color: '#3b82f6'
    },
    {
      id: 'large',
      title: 'Donación Grande',
      description: 'el doble de xavicoins por 15 dias',
      amount: 15,
      icon: '🎮',
      color: '#8b5cf6'
    },
    {
      id: 'huge',
      title: 'Donación Épica',
      description: 'el doble de xavicoins por 30 dias',
      amount: 20,
      icon: '💎',
      color: '#f59e0b'
    }
  ];

  const handleDonationOptionPress = (option: DonationOption) => {
    setSelectedAmount(option.amount);
  };

  const handleDonate = () => {
    const amount = selectedAmount;
    
    if (!amount || amount <= 0) {
      Alert.alert('Error', 'Por favor selecciona un monto válido para donar');
      return;
    }

    setShowQRModal(true);
  };

  const renderDonationOption = (option: DonationOption) => {
    const isSelected = selectedAmount === option.amount;
    
    return (
      <TouchableOpacity
        key={option.id}
        style={[
          donationsStyles.donationCard,
          isSelected && donationsStyles.donationCardSelected,
          { borderColor: option.color }
        ]}
        onPress={() => handleDonationOptionPress(option)}
        activeOpacity={0.7}
      >
        <View style={donationsStyles.donationHeader}>
          <Text style={donationsStyles.donationIcon}>{option.icon}</Text>
          <View style={donationsStyles.donationInfo}>
            <Text style={donationsStyles.donationTitle}>{option.title}</Text>
            <Text style={donationsStyles.donationDescription}>{option.description}</Text>
          </View>
          <View style={[donationsStyles.amountBadge, { backgroundColor: option.color }]}>
            <Text style={donationsStyles.amountText}>S/ {option.amount}</Text>
          </View>
        </View>
        {isSelected && (
          <View style={donationsStyles.selectedIndicator}>
            <Text style={donationsStyles.selectedText}>✓ Seleccionado</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const getTotalAmount = () => {
    return selectedAmount || 0;
  };

  const canDonate = () => {
    const amount = getTotalAmount();
    return amount > 0;
  };

  return (
    <ScreenWrapper>
      <PokemonHeader title="Donaciones" />
      <ScrollView 
        style={donationsStyles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header Section */}
        <View style={donationsStyles.headerSection}>
          <Text style={donationsStyles.headerTitle}>Apoya el Desarrollo</Text>
          <Text style={donationsStyles.headerDescription}>
            Tu donación nos ayuda a mantener y mejorar la aplicación. 
            Cada sol donado se invierte en nuevas funciones y mejoras.
          </Text>
        </View>

        {/* Donation Options */}
        <View style={donationsStyles.optionsSection}>
          <Text style={donationsStyles.sectionTitle}>Selecciona un Monto</Text>
          <View style={donationsStyles.optionsContainer}>
            {donationOptions.map(renderDonationOption)}
          </View>
        </View>


        {/* Donate Button */}
        <TouchableOpacity
          style={[
            donationsStyles.donateButton,
            !canDonate() && donationsStyles.donateButtonDisabled
          ]}
          onPress={handleDonate}
          disabled={!canDonate()}
          activeOpacity={0.7}
        >
          <Text style={[
            donationsStyles.donateButtonText,
            !canDonate() && donationsStyles.donateButtonTextDisabled
          ]}>
            {getTotalAmount() > 0 ? `Donar S/ ${getTotalAmount()}` : 'Selecciona un monto'}
          </Text>
        </TouchableOpacity>

        {/* Info Section */}
        <View style={donationsStyles.infoSection}>
          <Text style={donationsStyles.infoTitle}>¿Cómo funcionan las donaciones?</Text>
          <Text style={donationsStyles.infoText}>
            • Las donaciones se realizan mediante código QR{'\n'}
            • Tu apoyo nos ayuda a desarrollar nuevas funciones{'\n'}
            • Recibirás una confirmación de tu donación{'\n'}
            • Las donaciones son voluntarias y no afectan tu experiencia en la app
          </Text>
        </View>
      </ScrollView>

      {/* QR Modal */}
      <Modal
        visible={showQRModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowQRModal(false)}
      >
        <View style={donationsStyles.modalOverlay}>
          <View style={donationsStyles.qrModalContainer}>
            <View style={donationsStyles.qrModalHeader}>
              <Text style={donationsStyles.qrModalTitle}>Escanea el Código QR</Text>
              <TouchableOpacity
                style={donationsStyles.closeButton}
                onPress={() => setShowQRModal(false)}
              >
                <Text style={donationsStyles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <View style={donationsStyles.qrContainer}>
              <Image
                source={require('../../assets/qr.jpg')}
                style={donationsStyles.qrImage}
                resizeMode="contain"
              />
            </View>
            
            <Text style={donationsStyles.qrModalDescription}>
              Escanea este código QR o anota el numero 949771996 con tu app de pagos para donar S/ {selectedAmount} 
            </Text>
            
            <TouchableOpacity
              style={donationsStyles.qrModalButton}
              onPress={() => setShowQRModal(false)}
            >
              <Text style={donationsStyles.qrModalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

export default DonationsPage;
