import {
  Alert,
  AlertTitle,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Collapse,
  IconButton
} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export const WhatsAppAlert = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isVisible, setIsVisible] = useState(true);

  const handleJoinWhatsApp = () => {
    // Reemplaza con el enlace real de tu grupo de WhatsApp
    const whatsappLink = "https://chat.whatsapp.com/ClBaAeQBM0XEOSA3N3O13R";
    window.open(whatsappLink, '_blank');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Collapse in={isVisible}>
      <Alert
        severity="info"
        variant="outlined"
        sx={{
          mb: 3,
          borderRadius: 2,
          borderColor: '#E07F3F',
          bgcolor: 'rgba(224, 127, 63, 0.05)',
          '& .MuiAlert-icon': {
            color: '#E07F3F',
          },
          '& .MuiAlert-message': {
            color: '#0D3745',
          },
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={handleJoinWhatsApp}
              sx={{
                bgcolor: '#25D366',
                color: 'white',
                fontWeight: 600,
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                '&:hover': {
                  bgcolor: '#128C7E',
                },
              }}
            >
              {isMobile ? 'Unirse' : 'Unirse al grupo'}
            </Button>
            <IconButton
              size="small"
              onClick={handleClose}
              sx={{
                color: '#666',
                '&:hover': {
                  color: '#E07F3F',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <AlertTitle sx={{ fontWeight: 600, color: '#0D3745' }}>
          ¡Mantente informado! 📱
        </AlertTitle>
        <Box sx={{ fontSize: isMobile ? '0.875rem' : '1rem' }}>
          Si quieres saber de las futuras actualizaciones de <strong>XaviPlay</strong>, 
          únete a nuestro grupo de WhatsApp y sé el primero en conocer las nuevas funcionalidades.
        </Box>
      </Alert>
    </Collapse>
  );
}; 