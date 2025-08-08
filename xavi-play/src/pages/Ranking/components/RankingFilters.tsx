import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { rankingStyles } from '@/styles/ranking.styles';

interface Props {
  selectedSection: string | null;
  onSelect: (section: string) => void;
}

export const RankingFilters: React.FC<Props> = ({ selectedSection, onSelect }) => {
  const sections = [
    { value: '', label: 'Todas las secciones' },
    { value: '1ro Sec', label: '1ro Secundaria' },
    { value: '2do Sec', label: '2do Secundaria' },
    { value: '3ro Sec', label: '3ro Secundaria' },
    { value: '4to Sec', label: '4to Secundaria' },
    { value: '5to Sec', label: '5to Secundaria' },
  ];

  const isActive = (value: string) => selectedSection === value || (selectedSection === null && value === '');

  return (
    <View style={rankingStyles.filtersContainer}>
      <Text style={rankingStyles.filtersTitle}>Filtrar por sección:</Text>
      <View style={rankingStyles.filterButtonsContainer}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.value || 'all'}
            style={[rankingStyles.filterButton, isActive(section.value) && rankingStyles.filterButtonActive]}
            onPress={() => onSelect(section.value)}
            activeOpacity={0.7}
          >
            <Text
              style={[rankingStyles.filterButtonText, isActive(section.value) && rankingStyles.filterButtonTextActive]}
            >
              {section.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default RankingFilters;

