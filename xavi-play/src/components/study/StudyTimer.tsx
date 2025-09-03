import React from 'react';
import { View, Text } from 'react-native';
import { studyStyles } from '@/styles/study.styles';

interface StudyTimerProps {
  timer: number; // en segundos
  goal?: number; // meta en minutos
  isRunning: boolean;
}

export const StudyTimer: React.FC<StudyTimerProps> = ({ timer, goal, isRunning }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerProgress = (): number => {
    if (!goal) return 0;
    const goalSeconds = goal * 60;
    return Math.min(timer / goalSeconds, 1);
  };

  const getProgressColor = () => {
    const progress = getTimerProgress();
    if (progress >= 1) return '#10b981'; // success green
    if (progress >= 0.8) return '#fbbf24'; // warning yellow
    return '#3b82f6'; // primary blue
  };

  return (
    <View style={studyStyles.timerContainer}>
      <View style={[
        studyStyles.timerCircle,
        { 
          borderColor: getProgressColor(),
          backgroundColor: isRunning ? '#fef3c7' : '#f3f4f6'
        }
      ]}>
        <Text style={[
          studyStyles.timerText,
          { color: getProgressColor() }
        ]}>
          {formatTime(timer)}
        </Text>
      </View>
      
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={studyStyles.timerLabel}>
          {isRunning ? '⏰ Estudiando...' : '⏸️ Pausado'}
        </Text>
        
        {goal && (
          <Text style={studyStyles.timerGoal}>
            Meta: {goal} min
          </Text>
        )}
      </View>
    </View>
  );
};
