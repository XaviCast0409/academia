import { Box, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { formatNumber } from '../../utils/common';

interface XavicoinsDisplayProps {
  amount: number;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
}

export const XavicoinsDisplay = ({ 
  amount, 
  size = 'medium',
  showIcon = true 
}: XavicoinsDisplayProps) => {
  const sizeConfig = {
    small: { fontSize: '0.5rem', iconSize: 16 },
    medium: { fontSize: '0.6rem', iconSize: 20 },
    large: { fontSize: '0.8rem', iconSize: 24 },
  };

  const config = sizeConfig[size];

  return (
    <Box display="flex" alignItems="center" gap={0.5}>
      {showIcon && (
        <MonetizationOnIcon 
          sx={{ 
            color: '#E07F3F', 
            fontSize: config.iconSize 
          }} 
        />
      )}
      <Typography
        sx={{
          color: '#E07F3F',
          fontWeight: 600,
          fontSize: config.fontSize,
          fontFamily: "'Press Start 2P', cursive",
        }}
      >
        {formatNumber(amount)} Xavicoints
      </Typography>
    </Box>
  );
};
