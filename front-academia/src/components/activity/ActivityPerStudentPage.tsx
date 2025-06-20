// Estilo inspirado en videojuegos tipo shop de Pokémon con colores, bordes y detalles visuales más ricos
import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Pagination,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useActivityStore } from '../../store/activityStore';
import ActivityCardStudent from './ActivityCardStudent';

export const AvailableActivities = () => {
  const {
    activities,
    getAvailableActivitiesForStudentPaginated,
    page,
    totalPages,
    pageSize,
    setPage,
  } = useActivityStore();

  const [studentId, setStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-storage');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    setStudentId(payload.id);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!studentId) return;
      setLoading(true);
      await getAvailableActivitiesForStudentPaginated(studentId, page, pageSize);
      setLoading(false);
    };

    fetchActivities();
  }, [studentId, page, pageSize]);

  useEffect(() => {
    localStorage.setItem('actividadActualPage', String(page));
  }, [page]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, fontFamily: 'Press Start 2P', minHeight: '80vh' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: 'rgb(13, 55, 69)', color: 'white' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#FFCC00' }}>
          ✨ Tienda de Actividades Pokémon ✨
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <>
            <Grid container spacing={4} justifyContent="center">
              {activities.map((activity) => (
                <Grid key={activity.id}>
                  <ActivityCardStudent
                    id={activity.id}
                    title={activity.title}
                    description={activity.description}
                    image={activity.images?.[0] || 'https://via.placeholder.com/300'}
                    xavicoints={activity.xavicoints}
                    difficulty={activity.difficulty}
                  />
                </Grid>
              ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={5}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#FFCC00',
                  },
                }}
              />
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};