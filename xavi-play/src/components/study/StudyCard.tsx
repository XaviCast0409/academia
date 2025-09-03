import React from 'react';
import { View, Text, TouchableOpacity, Pressable } from 'react-native';
import { studyStyles } from '@/styles/study.styles';
import { StudyCard as StudyCardType, ANKI_BUTTONS } from '@/types/StudyTypes';
import { LaTexRenderer } from './LaTexRenderer';

interface StudyCardProps {
  card: StudyCardType;
  isShowingAnswer: boolean;
  currentIndex: number;
  totalCards: number;
  onShowAnswer: () => void;
  onAnswerDifficulty: (difficulty: 'again' | 'hard' | 'good' | 'easy') => void;
}

export const StudyCard: React.FC<StudyCardProps> = ({
  card,
  isShowingAnswer,
  currentIndex,
  totalCards,
  onShowAnswer,
  onAnswerDifficulty
}) => {


  return (
    <View style={studyStyles.cardContainer}>
      {/* Progress indicator */}
      <View style={studyStyles.cardProgress}>
        <Text style={studyStyles.cardProgressText}>
          {currentIndex + 1} de {totalCards}
        </Text>
        <Text style={studyStyles.cardProgressText}>
          {card.difficulty} • {card.category}
        </Text>
      </View>

      {/* Main card */}
      <View style={studyStyles.cardMain}>
        {/* Question */}
        <View style={studyStyles.cardQuestion}>
          <LaTexRenderer
            content={card.question}
            hasLatex={card.hasLatex}
            style={{
              fontSize: 18,
              lineHeight: 26,
              color: '#1f2937',
              textAlign: 'center',
              flexWrap: 'wrap',
            }}
          />
        </View>

        {/* Show answer button or answer content */}
        {!isShowingAnswer ? (
          <TouchableOpacity 
            style={studyStyles.showAnswerButton}
            onPress={onShowAnswer}
            activeOpacity={0.8}
          >
            <Text style={studyStyles.showAnswerText}>
              Mostrar Respuesta
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={studyStyles.cardDivider} />
            <View style={studyStyles.cardAnswer}>
              <LaTexRenderer
                content={card.answer}
                hasLatex={card.hasLatex}
                style={{
                  fontSize: 16,
                  lineHeight: 24,
                  color: '#4b5563',
                  textAlign: 'left',
                  flexWrap: 'wrap',
                }}
              />
            </View>
          </>
        )}
      </View>

      {/* Anki buttons - only show when answer is visible */}
      {isShowingAnswer && (
        <View style={studyStyles.ankiButtonsContainer}>
          {ANKI_BUTTONS.map((button) => (
            <Pressable
              key={button.key}
              style={[
                studyStyles.ankiButton,
                { backgroundColor: button.color }
              ]}
              onPress={() => onAnswerDifficulty(button.key)}
              android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
            >
              <Text style={studyStyles.ankiButtonText}>
                {button.label}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};
