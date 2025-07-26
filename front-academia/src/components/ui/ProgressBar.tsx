import { Box, LinearProgress, Typography } from '@mui/material';
import { useResponsive } from '../../hooks/common';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export const ProgressBar = ({
  current,
  total,
  label,
  showPercentage = true,
  color = 'primary',
}: ProgressBarProps) => {
  const { isMobile } = useResponsive();
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <Box sx={{ mb: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
        {label && (
          <Typography 
            fontSize={isMobile ? "0.85rem" : "0.95rem"} 
            color="primary.dark" 
            fontWeight={600}
          >
            {label}: {current}/{total}
          </Typography>
        )}
        {showPercentage && (
          <Typography 
            fontSize={isMobile ? "0.85rem" : "0.95rem"} 
            color="primary.dark" 
            fontWeight={600}
          >
            {percentage}%
          </Typography>
        )}
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        color={color}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
};
