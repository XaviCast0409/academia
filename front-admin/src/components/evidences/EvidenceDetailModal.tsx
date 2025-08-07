import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  IconButton,
  Alert,
  CircularProgress,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';
import type { EvidenceWithDetails } from '../../types/EvidenceTypes';
import { colors } from '../../styles/theme/colors';

interface EvidenceDetailModalProps {
  evidence: EvidenceWithDetails;
  open: boolean;
  onClose: () => void;
  onStatusChange: (evidenceId: number, status: 'approved' | 'rejected') => Promise<void>;
}

export const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({
  evidence,
  open,
  onClose,
  onStatusChange
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (status: 'approved' | 'rejected') => {
    try {
      setLoading(true);
      setError(null);
      await onStatusChange(evidence.id, status);
      onClose();
    } catch (err: any) {
      setError('Error al cambiar el estado de la evidencia. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4CAF50';
      case 'rejected':
        return '#F44336';
      case 'pending':
        return '#FF9800';
      default:
        return colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          background: 'rgba(40, 40, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.border.primary}`,
          borderRadius: 3,
          color: colors.text.primary
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: colors.text.primary,
        fontWeight: 600,
        fontSize: '1.5rem'
      }}>
        Detalles de la Evidencia
        <IconButton
          onClick={onClose}
          sx={{ color: colors.text.secondary }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              background: 'rgba(244, 67, 54, 0.1)',
              border: `1px solid ${colors.error.main}`,
              color: colors.error.main
            }}
          >
            {error}
          </Alert>
        )}

        {/* Header Info */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}>
                {evidence.activity.title}
              </Typography>
              <Typography variant="body1" sx={{ color: colors.text.secondary, mb: 2 }}>
                {evidence.activity.xavicoints} Xavicoints • Dificultad: {evidence.activity.difficulty}
              </Typography>
            </Box>
            <Chip
              label={getStatusText(evidence.status)}
              sx={{
                backgroundColor: getStatusColor(evidence.status),
                color: 'white',
                fontWeight: 600,
                fontSize: '0.9rem'
              }}
            />
          </Box>

          {/* Student Info */}
          <Card sx={{
            background: 'rgba(60, 60, 60, 0.8)',
            border: `1px solid ${colors.border.primary}`,
            borderRadius: 2,
            mb: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ color: colors.primary.main, mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600 }}>
                    {evidence.student.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                    {evidence.student.email}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <AssignmentIcon sx={{ color: colors.text.secondary, mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  {evidence.filePath.length} imagen{evidence.filePath.length !== 1 ? 'es' : ''} enviada{evidence.filePath.length !== 1 ? 's' : ''}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ color: colors.text.secondary, mr: 1, fontSize: 18 }} />
                <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                  Enviada: {new Date(evidence.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Images Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 3 }}>
            Imágenes de la Evidencia
          </Typography>
          
          {evidence.filePath.length > 0 ? (
            <Grid container spacing={2}>
              {evidence.filePath.map((imageUrl, index) => (
                <Grid key={index}>
                  <Card sx={{
                    background: 'rgba(60, 60, 60, 0.8)',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={imageUrl}
                      alt={`Evidencia ${index + 1}`}
                      sx={{
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={() => window.open(imageUrl, '_blank')}
                    />
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="body2" sx={{ color: colors.text.secondary, textAlign: 'center' }}>
                        Imagen {index + 1}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{
              background: 'rgba(60, 60, 60, 0.8)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 2,
              p: 4,
              textAlign: 'center'
            }}>
              <Typography variant="body1" sx={{ color: colors.text.secondary }}>
                No hay imágenes disponibles
              </Typography>
            </Box>
          )}
        </Box>

        {/* Activity Details */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 2 }}>
            Detalles de la Actividad
          </Typography>
          <Card sx={{
            background: 'rgba(60, 60, 60, 0.8)',
            border: `1px solid ${colors.border.primary}`,
            borderRadius: 2
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StarIcon sx={{ color: colors.primary.main, mr: 2, fontSize: 24 }} />
                <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600 }}>
                  {evidence.activity.xavicoints} Xavicoints
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                Dificultad: {evidence.activity.difficulty}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'space-between' }}>
        <Button
          onClick={onClose}
          sx={{
            color: colors.text.secondary,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          Cerrar
        </Button>

        {evidence.status === 'pending' && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
              onClick={() => handleStatusChange('approved')}
              disabled={loading}
              sx={{
                backgroundColor: '#4CAF50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#45a049'
                },
                '&:disabled': {
                  backgroundColor: '#666'
                }
              }}
            >
              Aprobar
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <CancelIcon />}
              onClick={() => handleStatusChange('rejected')}
              disabled={loading}
              sx={{
                backgroundColor: '#F44336',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#d32f2f'
                },
                '&:disabled': {
                  backgroundColor: '#666'
                }
              }}
            >
              Rechazar
            </Button>
          </Box>
        )}
      </DialogActions>
    </Dialog>
  );
};
