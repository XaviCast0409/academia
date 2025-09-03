import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { studyStyles } from '@/styles/study.styles';
import { StudyDeck, STUDY_TIME_OPTIONS } from '@/types/StudyTypes';

interface SessionConfigProps {
  deck: StudyDeck;
  onStartSession: (minutes: number) => void;
  onCancel: () => void;
}

export const SessionConfig: React.FC<SessionConfigProps> = ({
  deck,
  onStartSession,
  onCancel
}) => {
  const [selectedTime, setSelectedTime] = useState<number>(15);

  const selectedOption = STUDY_TIME_OPTIONS.find(opt => opt.minutes === selectedTime);

  const handleStartSession = () => {
    if (!selectedOption) return;

    Alert.alert(
      'Iniciar Sesión de Estudio',
      `¿Estás listo para estudiar ${deck.displayName} durante ${selectedOption.minutes} minutos?\n\nPuedes ganar hasta ${selectedOption.xavicoins} XaviCoins.`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Comenzar',
          onPress: () => onStartSession(selectedTime)
        }
      ]
    );
  };

  return (
    <View style={studyStyles.configContainer}>
      <Text style={studyStyles.configTitle}>
        🎒 {deck.displayName}
      </Text>

      <Text style={studyStyles.deckDescription}>
        {deck.description}
      </Text>

      <View style={studyStyles.deckStats}>
        <View style={studyStyles.deckStat}>
          <Text style={studyStyles.deckStatValue}>{deck.cardCount}</Text>
          <Text style={studyStyles.deckStatLabel}>Tarjetas</Text>
        </View>
        
        <View style={studyStyles.deckStat}>
          <Text style={[studyStyles.deckStatValue, { color: '#fbbf24' }]}>
            {deck.totalXavicoins}
          </Text>
          <Text style={studyStyles.deckStatLabel}>Total XaviCoins</Text>
        </View>
      </View>

      <Text style={[studyStyles.configTitle, { fontSize: 18, marginTop: 24 }]}>
        ⏰ Duración del Estudio
      </Text>

      <View style={studyStyles.timeOptionsGrid}>
        {STUDY_TIME_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.minutes}
            style={[
              studyStyles.timeOption,
              selectedTime === option.minutes && studyStyles.timeOptionSelected
            ]}
            onPress={() => setSelectedTime(option.minutes)}
            activeOpacity={0.7}
          >
            <Text style={studyStyles.timeOptionTime}>
              {option.label}
            </Text>
            <Text style={studyStyles.timeOptionReward}>
              +{option.xavicoins} XaviCoins
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={studyStyles.actionButton}
        onPress={handleStartSession}
        activeOpacity={0.8}
      >
        <Text style={studyStyles.actionButtonText}>
          ⚡ Comenzar Estudio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[studyStyles.actionButton, studyStyles.actionButtonSecondary]}
        onPress={onCancel}
        activeOpacity={0.8}
      >
        <Text style={[studyStyles.actionButtonText, studyStyles.actionButtonTextSecondary]}>
          Cancelar
        </Text>
      </TouchableOpacity>
    </View>
  );
};
