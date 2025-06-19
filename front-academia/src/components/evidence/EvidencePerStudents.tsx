import {
  Box,
  Chip,
  CircularProgress,
  Container,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useEffect, useState } from 'react';
import { useEvidenceStore } from '../../store/evidenceStore';
import PersonIcon from '@mui/icons-material/Person';

export const EvidencePerStudents = () => {
  const token = localStorage.getItem('auth-storage');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const studentId = user?.id;

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const { evidences, totalPages, getEvidencePerStudent, cleanEvidences } = useEvidenceStore();
  console.log(evidences);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Container
      sx={{
        py: 4,
        bgcolor: '#fff3e6',
        minHeight: '100vh',
        borderRadius: 2,
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: `'Press Start 2P', cursive`,
          color: '#0D3745',
          fontSize: isMobile ? '0.9rem' : '1.1rem',
          mb: 4,
          textAlign: 'center',
        }}
      >
        TUS EVIDENCIAS
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {evidences.map((ev) => (
            <Box
              key={ev.id}
              sx={{
                border: '2px solid #84341c',
                borderRadius: 2,
                p: 2,
                backgroundColor: '#fffaf5',
                fontFamily: `'Press Start 2P', cursive`,
                fontSize: isMobile ? '0.65rem' : '0.75rem',
                color: '#333',
                boxShadow: '4px 4px 0px #0D3745',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <AssignmentTurnedInIcon sx={{ color: '#84341c' }} />
                <Typography
                  sx={{
                    fontSize: isMobile ? '0.75rem' : '0.85rem',
                    color: '#333',
										fontFamily: "inherit",
                  }}
                >
                  Actividad: {ev.activity?.title || 'Sin título'}
                </Typography>
              </Box>
							<Box display="flex" alignItems="center" gap={1}>
								<PersonIcon sx={{ color: '#0D3745' }} />
								<Typography
									sx={{
										fontSize: isMobile ? '0.75rem' : '0.85rem',
										color: '#555',
										fontFamily: "inherit",
									}}
								>
                  Profesor: {ev.activity?.professor.name || 'Sin nombre'}
								</Typography>
							</Box>
							

              <Box display="flex" alignItems="center" gap={1}>
                <EventNoteIcon sx={{ color: '#E07F3F' }} />
                <Typography
                  sx={{
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                    color: '#555',
										fontFamily: "inherit",
                  }}
                >
                  Enviado el:{' '}
                  {ev.createdAt
                    ? new Date(ev.createdAt).toLocaleString()
                    : 'Fecha no disponible'}
                </Typography>
              </Box>

              <Box mt={1}>
                <Chip
                  label={ev.status.toUpperCase()}
                  sx={{
                    fontFamily: `'Press Start 2P', cursive`,
                    fontSize: isMobile ? '0.6rem' : '0.7rem',
                    bgcolor: getStatusColorCustom(ev.status),
                    color: '#fff',
                    px: 2,
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {totalPages > 1 && (
        <Box mt={5} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            size="large"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: `'Press Start 2P', cursive`,
                fontSize: '0.6rem',
                color: '#0D3745',
                border: '2px solid #0D3745',
              },
              '& .Mui-selected': {
                bgcolor: '#E07F3F !important',
                color: '#fff !important',
              },
            }}
          />
        </Box>
      )}
    </Container>
  );
};
