import { Chip } from '@mui/material';
import { EVIDENCE_STATUS } from '../../utils/common';

interface StatusBadgeProps {
  status: keyof typeof EVIDENCE_STATUS;
  size?: 'small' | 'medium';
}

export const StatusBadge = ({ status, size = 'small' }: StatusBadgeProps) => {
  const config = EVIDENCE_STATUS[status];
  
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
