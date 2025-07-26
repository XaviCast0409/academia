import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  color?: 'primary' | 'secondary';
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({
  size = 40,
  color = 'primary',
  message,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  return (
    <Box 
      sx={fullScreen
        ? {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: 2,
          }
        : {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4,
            gap: 2,
          }
      }
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};
