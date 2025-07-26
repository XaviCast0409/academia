import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backUrl?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  children?: React.ReactNode;
}

export const PageHeader = ({
  title,
  subtitle,
  showBackButton = false,
  backUrl,
  actionButton,
  children,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBackClick = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {showBackButton && (
        <Button
          variant="outlined"
          onClick={handleBackClick}
          startIcon={<ArrowBack />}
          sx={{ 
            mb: 2,
            color: "#E07F3F",
            borderColor: "#E07F3F",
            fontFamily: "'Press Start 2P', cursive",
            fontSize: isMobile ? '0.5rem' : '0.6rem',
            "&:hover": {
              backgroundColor: "#E07F3F",
              color: "#fff",
              borderColor: "#E07F3F",
            }
          }}
        >
          Volver
        </Button>
      )}
      
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={isMobile ? 'flex-start' : 'center'}
        flexDirection={isMobile ? 'column' : 'row'}
        gap={2}
        mb={subtitle ? 2 : 0}
      >
        <Box>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            color="#84341C"
            sx={{ 
              fontWeight: 600,
              fontFamily: "'Press Start 2P', cursive",
              fontSize: isMobile ? '0.8rem' : '1rem',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body1"
              color="#84341C"
              sx={{ 
                mt: 0.5,
                fontFamily: "'Press Start 2P', cursive",
                fontSize: isMobile ? '0.5rem' : '0.6rem',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {actionButton && (
          <Button
            variant="contained"
            startIcon={actionButton.icon}
            onClick={actionButton.onClick}
            sx={{
              backgroundColor: "#E07F3F",
              color: "#fff",
              fontFamily: "'Press Start 2P', cursive",
              fontSize: isMobile ? '0.5rem' : '0.6rem',
              "&:hover": {
                backgroundColor: "#C76F2F",
              }
            }}
          >
            {actionButton.label}
          </Button>
        )}
      </Box>

      {children}
    </Box>
  );
};
