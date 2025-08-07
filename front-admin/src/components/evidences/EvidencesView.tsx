import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Pagination
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { evidenceService } from '../../service/evidenceService';
import { authService } from '../../service/authService';
import type { EvidenceWithDetails } from '../../types/EvidenceTypes';
import { backgroundUtils, typographyUtils } from '../../styles/utils/themeUtils';
import { colors } from '../../styles/theme/colors';
import { EvidenceDetailModal } from './EvidenceDetailModal';

export const EvidencesView = () => {
  const [evidences, setEvidences] = useState<EvidenceWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceWithDetails | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    loadEvidences();
  }, [currentPage]);

  const loadEvidences = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const professorId = authService.getUserId();
      if (!professorId) {
        setError('Error: No se pudo obtener el ID del profesor.');
        return;
      }

      const response = await evidenceService.getProfessorEvidences(professorId, currentPage, 10);
      setEvidences(response.evidences);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err: any) {
      setError('Error al cargar las evidencias. Por favor, inténtalo de nuevo.');
      console.error('Error loading evidences:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewEvidence = (evidence: EvidenceWithDetails) => {
    setSelectedEvidence(evidence);
    setIsDetailModalOpen(true);
  };

  const handleStatusChange = async (evidenceId: number, status: 'approved' | 'rejected') => {
    try {
      const professorId = authService.getUserId();
      if (!professorId) {
        setError('Error: No se pudo obtener el ID del profesor.');
        return;
      }

      await evidenceService.changeEvidenceStatus(evidenceId, status, professorId);
      
      // Recargar evidencias
      await loadEvidences();
    } catch (err: any) {
      setError('Error al cambiar el estado de la evidencia. Por favor, inténtalo de nuevo.');
      console.error('Error changing evidence status:', err);
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

  if (loading) {
    return (
      <Box sx={{
        ...backgroundUtils.mainBackground,
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress
          sx={{
            color: colors.primary.main,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            }
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{
      ...backgroundUtils.mainBackground,
      minHeight: '100vh',
      width: '85vw',
    }}>
      {/* Header Section */}
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h3"
          sx={{
            ...typographyUtils.title,
            fontSize: '2.5rem',
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(135deg, #4285F4 0%, #34A853 50%, #FF6B6B 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Evidencias
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: colors.text.secondary,
            fontWeight: 400,
            letterSpacing: '0.5px',
            p: 3
          }}
        >
          Revisa y gestiona las evidencias de tus estudiantes
        </Typography>
      </Box>

      {/* Error Alert */}
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

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4, p: 3 }}>
        <Grid>
          <Paper
            sx={{
              background: 'rgba(40, 40, 40, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${colors.border.secondary}`
              }
            }}
          >
            <Typography variant="h4" sx={{ color: colors.primary.main, fontWeight: 700 }}>
              {totalItems}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Total Evidencias
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              background: 'rgba(40, 40, 40, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${colors.border.secondary}`
              }
            }}
          >
            <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 700 }}>
              {evidences.filter(e => e.status === 'pending').length}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Pendientes
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              background: 'rgba(40, 40, 40, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${colors.border.secondary}`
              }
            }}
          >
            <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 700 }}>
              {evidences.filter(e => e.status === 'approved').length}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Aprobadas
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper
            sx={{
              background: 'rgba(40, 40, 40, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: `1px solid ${colors.border.secondary}`
              }
            }}
          >
            <Typography variant="h4" sx={{ color: '#F44336', fontWeight: 700 }}>
              {evidences.filter(e => e.status === 'rejected').length}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Rechazadas
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Evidences List */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ color: colors.text.primary, fontWeight: 600, mb: 3 }}>
          Lista de Evidencias
        </Typography>

        {evidences.length > 0 ? (
          <Grid container spacing={3}>
            {evidences.map((evidence) => (
              <Grid key={evidence.id}>
                <Card
                  sx={{
                    background: 'rgba(40, 40, 40, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${colors.border.primary}`,
                    borderRadius: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${colors.border.secondary}`
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ color: colors.text.primary, fontWeight: 600, mb: 1 }}>
                          {evidence.activity.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2 }}>
                          {evidence.activity.xavicoints} Xavicoints • {evidence.activity.difficulty}
                        </Typography>
                      </Box>
                      <Chip
                        label={getStatusText(evidence.status)}
                        sx={{
                          backgroundColor: getStatusColor(evidence.status),
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PersonIcon sx={{ color: colors.text.secondary, mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: colors.text.primary }}>
                        {evidence.student.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AssignmentIcon sx={{ color: colors.text.secondary, mr: 1, fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                        {evidence.filePath.length} imagen{evidence.filePath.length !== 1 ? 'es' : ''}
                      </Typography>
                    </Box>

                    <Typography variant="caption" sx={{ color: colors.text.secondary }}>
                      Enviada: {new Date(evidence.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                    <Button
                      size="small"
                      startIcon={<VisibilityIcon />}
                      onClick={() => handleViewEvidence(evidence)}
                      sx={{
                        color: colors.primary.main,
                        '&:hover': {
                          background: 'rgba(66, 133, 244, 0.1)'
                        }
                      }}
                    >
                      Ver Detalles
                    </Button>

                    {evidence.status === 'pending' && (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(evidence.id, 'approved')}
                          sx={{
                            color: '#4CAF50',
                            '&:hover': {
                              background: 'rgba(76, 175, 80, 0.1)'
                            }
                          }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleStatusChange(evidence.id, 'rejected')}
                          sx={{
                            color: '#F44336',
                            '&:hover': {
                              background: 'rgba(244, 67, 54, 0.1)'
                            }
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Box>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper
            sx={{
              background: 'rgba(40, 40, 40, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.border.primary}`,
              borderRadius: 3,
              p: 8,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ color: colors.text.secondary, mb: 2 }}>
              No hay evidencias disponibles
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              Los estudiantes aún no han enviado evidencias para tus actividades
            </Typography>
          </Paper>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: colors.text.primary,
                  '&.Mui-selected': {
                    backgroundColor: colors.primary.main,
                    color: 'white'
                  }
                }
              }}
            />
          </Box>
        )}
      </Box>

      {/* Evidence Detail Modal */}
      {selectedEvidence && (
        <EvidenceDetailModal
          evidence={selectedEvidence}
          open={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedEvidence(null);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </Box>
  );
};
