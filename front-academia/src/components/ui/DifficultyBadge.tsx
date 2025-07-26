import { Chip } from '@mui/material';
import { DIFFICULTY_LEVELS } from '../../utils/common';

interface DifficultyBadgeProps {
  difficulty: keyof typeof DIFFICULTY_LEVELS;
  size?: 'small' | 'medium';
}

export const DifficultyBadge = ({ difficulty, size = 'small' }: DifficultyBadgeProps) => {
  const config = DIFFICULTY_LEVELS[difficulty];
  
  if (!config) return null;

  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        bgcolor: config.color,
        color: 'white',
        fontWeight: 600,
        fontSize: size === 'small' ? '0.75rem' : '0.85rem',
      }}
    />
  );
};
