import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  MonetizationOn as CoinIcon,
  School as SchoolIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface RewardsModalProps {
  open: boolean;
  onClose: () => void;
}

const RewardsModal: React.FC<RewardsModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fdfdfd',
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#0D3745',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <TrophyIcon sx={{ color: '#E07F3F' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            🏆 Recompensas Mensuales
          </Typography>
        </Box>
        <Button
          onClick={onClose}
          sx={{
            color: 'white',
            minWidth: 'auto',
            p: 0.5,
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.1)',
            }
          }}
        >
          <CloseIcon />
        </Button>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography
          variant="body1"
          sx={{
            color: '#84341C',
            textAlign: 'center',
            mb: 3,
            fontWeight: 500,
            fontSize: isMobile ? '0.9rem' : '1rem'
          }}
        >
          ¡Compite por mantener tu posición y gana recompensas especiales!
        </Typography>

        {/* Recompensa General */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: '#FFD700',
            borderRadius: 2,
            border: '2px solid #84341C',
            textAlign: 'center',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
            <TrophyIcon sx={{ color: '#84341C', fontSize: '2rem' }} />
            <Typography
              variant="h6"
              sx={{
                color: '#84341C',
                fontWeight: 700,
                fontSize: isMobile ? '1.1rem' : '1.25rem'
              }}
            >
              1er Lugar General
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <CoinIcon sx={{ color: '#84341C', fontSize: '1.5rem' }} />
            <Typography
              variant="h5"
              sx={{
                color: '#84341C',
                fontWeight: 700,
                fontSize: isMobile ? '1.3rem' : '1.5rem'
              }}
            >
              30 Xavicoints
            </Typography>
          </Box>
          
          <Typography
            variant="body2"
            sx={{
              color: '#84341C',
              mt: 1,
              fontWeight: 500,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}
          >
            Para el estudiante con el nivel más alto de toda la academia
          </Typography>
        </Box>

        {/* Recompensa por Sección */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: '#E07F3F',
            borderRadius: 2,
            border: '2px solid #0D3745',
            textAlign: 'center',
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
            <SchoolIcon sx={{ color: 'white', fontSize: '2rem' }} />
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: isMobile ? '1.1rem' : '1.25rem'
              }}
            >
              1er Lugar por Sección
            </Typography>
          </Box>
          
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <CoinIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: isMobile ? '1.3rem' : '1.5rem'
              }}
            >
              20 Xavicoints
            </Typography>
          </Box>
          
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              mt: 1,
              fontWeight: 500,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}
          >
            Para el estudiante con el nivel más alto de cada sección
          </Typography>
        </Box>

        {/* Información adicional */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#f8f8f8',
            borderRadius: 2,
            border: '1px solid #E07F3F',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: '#0D3745',
              textAlign: 'center',
              fontWeight: 600,
              mb: 1,
              fontSize: isMobile ? '0.85rem' : '0.9rem'
            }}
          >
            📅 ¿Cuándo se otorgan las recompensas?
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: '#84341C',
              textAlign: 'center',
              fontSize: isMobile ? '0.8rem' : '0.85rem'
            }}
          >
            Las recompensas se otorgan al final de cada mes a los estudiantes que mantengan su posición en el ranking. 
            ¡Mantén tu nivel alto para asegurar tu recompensa!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: '#f8f8f8' }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#0D3745',
            color: 'white',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#84341C',
            },
            px: 3,
          }}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardsModal; 