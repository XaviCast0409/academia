import { Chip } from '@mui/material';
import { MISSION_TYPES } from '../../utils/common';

interface MissionTypeBadgeProps {
  type: keyof typeof MISSION_TYPES;
  size?: 'small' | 'medium';
}

export const MissionTypeBadge = ({ type, size = 'small' }: MissionTypeBadgeProps) => {
  const config = MISSION_TYPES[type];
  
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
