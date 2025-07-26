import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import { useEvidenceStore } from '../../store/evidenceStore';
import { useActivityStore } from '../../store/activityStore';
import { EvidenceModal } from '../registro/EvidenceModal';
import { EvidenceStatusModal } from '../registro/EvidenceStatusModal';

import { PageHeader, LoadingSpinner, Pagination, GameCard } from '../common';
import { useResponsive, getCurrentUser } from '../../shared';

export const ProfessorEvidenceList = () => {
  const { user } = getCurrentUser();
  const professorId = user?.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  const { isMobile } = useResponsive();

  const {
    evidences,
    totalPages,
    getEvidencePerProfessor,
    updateEvidenceStatus,
    cleanEvidences
  } = useEvidenceStore();
  const changeStatusAndAddPoints = useActivityStore(state => state.changeEvidenceStatusAndAddXavicoints);

  useEffect(() => {
    const fetchEvidences = async () => {
      if (!professorId) return;
      setLoading(true);
      await getEvidencePerProfessor(professorId, page);
      setLoading(false);
    };

    fetchEvidences();

    return cleanEvidences;
  }, [page, professorId, getEvidencePerProfessor]);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const handleReviewClick = (evidence: any) => {
    setSelectedEvidence(evidence);
    setModalOpen(true);
  };

  const handleChangeStatusClick = (evidence: any) => {
    setSelectedEvidence(evidence);
    setStatusModalOpen(true);
  };

  const handleStatusSubmit = async (newStatus: 'approved' | 'rejected') => {
    if (!selectedEvidence) return;

    try {
      const updatedActivity = await changeStatusAndAddPoints(selectedEvidence.activityId, {
        evidenceId: selectedEvidence.id,
        status: newStatus,
      }) as any;

      if (updatedActivity && Array.isArray(updatedActivity.evidences)) {
        const updatedEvidence = updatedActivity.evidences.find((ev: any) => ev.id === selectedEvidence.id);
        if (updatedEvidence) {
          // Update the evidence in the store with the complete data
          updateEvidenceStatus({
            ...updatedEvidence,
            activity: updatedActivity,
            student: updatedEvidence.student
          });
        }
      }

      setStatusModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el estado de la evidencia", error);
    }
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        maxWidth: 'md',
        mx: 'auto',
        fontFamily: 'Press Start 2P'
      }}
    >
      <PageHeader
        title="📂 Evidencias Recibidas"
        subtitle="Revisa y evalúa las evidencias de tus estudiantes"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <LoadingSpinner />
        </Box>
      ) : evidences.length > 0 ? (
        <>
          <List disablePadding>
            {evidences.map((ev) => {
              const isFinalized = ev.status === 'approved' || ev.status === 'rejected';
              return (
                <Box key={ev.id} sx={{ mb: 2 }}>
                  <GameCard>
                    <ListItem disablePadding sx={{ 
                      flexDirection: isMobile ? 'column' : 'row', 
                      alignItems: isMobile ? 'flex-start' : 'center', 
                      justifyContent: 'space-between', 
                      flexWrap: 'wrap' 
                    }}>
                      <Box sx={{ flex: 1 }}>
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <ListItemIcon sx={{ minWidth: '30px', color: 'primary.main' }}>
                            <AssignmentTurnedInIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={`Actividad: ${ev.activity?.title}`}
                            primaryTypographyProps={{ 
                              fontSize: isMobile ? '0.7rem' : '0.8rem', 
                              color: 'primary.main',
                              fontFamily: 'Press Start 2P'
                            }}
                          />
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <ListItemIcon sx={{ minWidth: '30px', color: 'text.secondary' }}>
                            <PersonIcon />
                          </ListItemIcon>
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.65rem' : '0.75rem', 
                            color: 'text.secondary',
                            fontFamily: 'Press Start 2P'
                          }}>
                            Estudiante: {ev.student?.name}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                          <ListItemIcon sx={{ minWidth: '30px', color: '#FFCC00' }}>
                            <EventNoteIcon />
                          </ListItemIcon>
                          <Typography sx={{ 
                            fontSize: isMobile ? '0.6rem' : '0.7rem', 
                            color: 'text.secondary',
                            fontFamily: 'Press Start 2P'
                          }}>
                            Enviado el: {ev.createdAt ? new Date(ev.createdAt).toLocaleString() : 'Fecha no disponible'}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1} mb={1}>
                          <Chip
                            label={`Dificultad: ${ev.activity?.difficulty || 'N/A'}`}
                            size="small"
                            sx={{ 
                              backgroundColor: 'action.hover', 
                              color: 'text.secondary',
                              fontFamily: 'Press Start 2P',
                              fontSize: '0.6rem'
                            }}
                          />
                          <Chip
                            label={`${ev.activity?.xavicoints || 0} XC`}
                            size="small"
                            sx={{ 
                              backgroundColor: '#FFCC00', 
                              color: '#000',
                              fontFamily: 'Press Start 2P',
                              fontSize: '0.6rem'
                            }}
                          />
                        </Box>

                        <Box>
                          <Chip
                            label={ev.status.toUpperCase()}
                            color={getStatusColor(ev.status)}
                            variant="outlined"
                            size="small"
                            sx={{
                              fontFamily: 'Press Start 2P',
                              fontSize: '0.6rem'
                            }}
                          />
                        </Box>
                      </Box>

                      <Box sx={{ 
                        mt: isMobile ? 2 : 0, 
                        display: 'flex', 
                        flexDirection: isMobile ? 'column' : 'row', 
                        gap: 1 
                      }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleReviewClick(ev)}
                          disabled={isFinalized}
                          sx={{ 
                            backgroundColor: 'primary.main',
                            fontFamily: 'Press Start 2P',
                            fontSize: '0.6rem',
                            '&:hover': { 
                              backgroundColor: 'primary.dark' 
                            } 
                          }}
                        >
                          Revisar
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleChangeStatusClick(ev)}
                          disabled={isFinalized}
                          sx={{
                            fontFamily: 'Press Start 2P',
                            fontSize: '0.6rem',
                            borderColor: 'primary.main',
                            color: 'primary.main'
                          }}
                        >
                          Cambiar Estado
                        </Button>
                      </Box>
                    </ListItem>
                  </GameCard>
                </Box>
              );
            })}
          </List>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </Box>
          )}
        </>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.7rem' : '0.9rem'
            }}
          >
            No se encontraron evidencias.
          </Typography>
        </Box>
      )}

      {/* Modales */}
      <EvidenceModal
        open={modalOpen}
        images={selectedEvidence?.filePath || []}
        onClose={() => setModalOpen(false)}
      />
      <EvidenceStatusModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onSubmit={handleStatusSubmit}
        initialStatus={selectedEvidence?.status || 'pending'}
      />
    </Box>
  );
};
