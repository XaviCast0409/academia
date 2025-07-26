import {
  Box,
  Chip,
  Typography,
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useEffect, useState } from 'react';
import { useEvidenceStore } from '../../store/evidenceStore';
import PersonIcon from '@mui/icons-material/Person';

import { PageHeader, LoadingSpinner, Pagination, GameCard } from '../common';
import { useResponsive, getCurrentUser } from '../../shared';

export const EvidencePerStudents = () => {
  const { user } = getCurrentUser();
  const studentId = user?.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { evidences, totalPages, getEvidencePerStudent, cleanEvidences } = useEvidenceStore();
  const { isMobile } = useResponsive();

  useEffect(() => {
    const fetchEvidences = async () => {
      if (!studentId) return;
      setLoading(true);
      await getEvidencePerStudent(studentId, page);
      setLoading(false);
    };
    fetchEvidences();
    return cleanEvidences;
  }, [page, studentId, getEvidencePerStudent]);

  // Colores personalizados tipo retro para los status
  const getStatusColorCustom = (status: string) => {
    switch (status) {
      case 'approved':
        return '#4caf50'; // verde
      case 'rejected':
        return '#f44336'; // rojo
      case 'pending':
      default:
        return '#ff9800'; // naranja
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
        title="TUS EVIDENCIAS"
        subtitle="Revisa el estado de tus evidencias enviadas"
      />

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <LoadingSpinner />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {evidences.map((ev) => (
            <GameCard key={ev.id}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <AssignmentTurnedInIcon color="primary" />
                  <Typography
                    sx={{
                      fontSize: isMobile ? '0.7rem' : '0.8rem',
                      color: 'primary.main',
                      fontFamily: 'Press Start 2P',
                    }}
                  >
                    Actividad: {ev.activity?.title || 'Sin título'}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon sx={{ color: 'text.secondary' }} />
                  <Typography
                    sx={{
                      fontSize: isMobile ? '0.65rem' : '0.75rem',
                      color: 'text.secondary',
                      fontFamily: 'Press Start 2P',
                    }}
                  >
                    Profesor: {ev.activity?.professor.name || 'Sin nombre'}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <EventNoteIcon sx={{ color: '#FFCC00' }} />
                  <Typography
                    sx={{
                      fontSize: isMobile ? '0.6rem' : '0.7rem',
                      color: 'text.secondary',
                      fontFamily: 'Press Start 2P',
                    }}
                  >
                    Enviado el:{' '}
                    {ev.createdAt
                      ? new Date(ev.createdAt).toLocaleString()
                      : 'Fecha no disponible'}
                  </Typography>
                </Box>

                <Box>
                  <Chip
                    label={ev.status.toUpperCase()}
                    sx={{
                      fontFamily: 'Press Start 2P',
                      fontSize: isMobile ? '0.6rem' : '0.7rem',
                      bgcolor: getStatusColorCustom(ev.status),
                      color: '#fff',
                      borderRadius: '8px',
                    }}
                  />
                </Box>
              </Box>
            </GameCard>
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box mt={5} display="flex" justifyContent="center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </Box>
      )}
    </Box>
  );
};
