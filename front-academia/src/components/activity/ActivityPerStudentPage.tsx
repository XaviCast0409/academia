import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Typography,
  Pagination,
  Box,
} from '@mui/material';
import { useActivityStore } from '../../store/activityStore';
import ActivityCardStudent from './ActivityCardStudent';

export const AvailableActivities = () => {
  const {
    activities,
    getAvailableActivitiesForStudentPaginated,
    page,
    totalPages,
    pageSize, // asegúrate de tenerlo en la store
    setPage,  // crea esta acción en tu store si no existe
  } = useActivityStore();

  const [studentId, setStudentId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    setStudentId(payload.id);
  }, []);

  useEffect(() => {
    if (studentId) {
      getAvailableActivitiesForStudentPaginated(studentId, page, pageSize);
    }
  }, [studentId, page, pageSize]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value); // cambiar página en la store
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Actividades Disponibles
      </Typography>

      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid key={activity.id}>
            <ActivityCardStudent
              id={activity.id}
              title={activity.title}
              description={activity.description}
              image={activity.images?.[0] || 'https://via.placeholder.com/300'}
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
    </Container>
  );
};
