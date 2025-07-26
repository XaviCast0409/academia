import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = ({ title, description, icon, action }: EmptyStateProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        textAlign: 'center',
        gap: 2,
      }}
    >
      {icon && (
        <Box sx={{ mb: 2, opacity: 0.5 }}>{icon}</Box>
      )}
      
      <Typography
        variant="h6"
        color="text.primary"
        sx={{ fontWeight: 600 }}
      >
        {title}
      </Typography>
      
      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 400 }}
        >
          {description}
        </Typography>
      )}
      
      {action && (
        <Box sx={{ mt: 2 }}>{action}</Box>
      )}
    </Box>
  );
};
