import React from 'react';
import { View, Text } from 'react-native';
import { rankingStyles } from '@/styles/ranking.styles';

interface Props {
  selectedSection: string | null;
}

export const RankingEmptyState: React.FC<Props> = ({ selectedSection }) => {
  return (
    <View style={rankingStyles.emptyContainer}>
      <Text style={rankingStyles.emptyIcon}>🏆</Text>
      <Text style={rankingStyles.emptyTitle}>No hay usuarios en el ranking</Text>
      <Text style={rankingStyles.emptyText}>
        {selectedSection
          ? `No hay estudiantes en la sección "${selectedSection}"`
          : 'Aún no hay estudiantes registrados en el sistema.'}
      </Text>
    </View>
  );
};

export default RankingEmptyState;

