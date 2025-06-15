import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Pagination,
  useMediaQuery,
  useTheme,
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

export const ProfessorEvidenceList = () => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const professorId = user?.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<any>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    evidences,
    totalPages,
    getEvidencePerProfessor,
    updateEvidenceStatus,
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
  }, [page, professorId, getEvidencePerProfessor]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
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
      });

      const updatedEvidence = Array.isArray((updatedActivity as any).evidences)
        ? (updatedActivity as any).evidences.find((ev: any) => ev.id === selectedEvidence.id)
        : undefined;

      if (updatedEvidence) {
        updateEvidenceStatus(updatedEvidence);
      }

      setStatusModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el estado de la evidencia", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography
        variant="h5"
        sx={{ textAlign: 'center', mb: 4, fontWeight: 600, color: '#0D3745' }}
      >
        📂 Evidencias Recibidas
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress sx={{ color: '#E07F3F' }} />
        </Box>
      ) : evidences.length > 0 ? (
        <>
          <List disablePadding>
            {evidences.map((ev) => {
              const isFinalized = ev.status === 'approved' || ev.status === 'rejected';
              return (
                <Box
                  key={ev.id}
                  sx={{
                    px: 2,
                    py: 2,
                    mb: 2,
                    bgcolor: '#fdfdfd',
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
                    transition: '0.2s ease',
                    '&:hover': { backgroundColor: '#f8f8f8' },
                  }}
                >
                  <ListItem disablePadding sx={{ flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    <Box>
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#84341c' }}>
                          <AssignmentTurnedInIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Actividad: ${ev.activity?.title}`}
                          primaryTypographyProps={{ fontSize: isMobile ? '0.9rem' : '1rem', color: '#333' }}
                        />
                      </Box>

                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#0D3745' }}>
                          <PersonIcon />
                        </ListItemIcon>
                        <Typography sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem', color: '#555' }}>
                          Estudiante: {ev.student?.name}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" gap={1}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#E07F3F' }}>
                          <EventNoteIcon />
                        </ListItemIcon>
                        <Typography sx={{ fontSize: isMobile ? '0.75rem' : '0.85rem', color: '#777' }}>
                          Enviado el: {ev.createdAt ? new Date(ev.createdAt).toLocaleString() : 'Fecha no disponible'}
                        </Typography>
                      </Box>

                      <Box mt={1}>
                        <Chip
                          label={ev.status.toUpperCase()}
                          color={getStatusColor(ev.status)}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mt: isMobile ? 1 : 0, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleReviewClick(ev)}
                        disabled={isFinalized}
                        sx={{ backgroundColor: 'rgb(132, 52, 28)', '&:hover': { backgroundColor: 'rgb(13, 55, 69)' } }}
                      >
                        Revisar Evidencias
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleChangeStatusClick(ev)}
                        disabled={isFinalized}
                      >
                        Cambiar Estado
                      </Button>
                    </Box>
                  </ListItem>
                </Box>
              );
            })}
          </List>

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      ) : (
        <Box mt={6} textAlign="center">
          <Typography variant="body1" sx={{ color: '#84341c' }}>
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
    </Container>
  );
};
