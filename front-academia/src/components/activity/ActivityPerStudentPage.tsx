import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Pagination,
  Box,
  CircularProgress,
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
  const [loading, setLoading] = useState(false); // ✅ estado local de carga

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    setStudentId(payload.id);
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!studentId) return;
      setLoading(true); // ✅ empieza carga
      await getAvailableActivitiesForStudentPaginated(studentId, page, pageSize);
      setLoading(false); // ✅ termina carga
    };

    fetchActivities();
  }, [studentId, page, pageSize]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Actividades Disponibles
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {activities.map((activity) => (
              <Grid key={activity.id}>
                <ActivityCardStudent
                  id={activity.id}
                  title={activity.title}
                  description={activity.description}
                  image={activity.images?.[0] || 'https://via.placeholder.com/300'}
                  xavicoints={activity.xavicoints}
                />
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};
