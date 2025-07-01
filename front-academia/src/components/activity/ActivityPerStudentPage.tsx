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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  const [section, setSection] = useState<string>('');

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
      await getAvailableActivitiesForStudentPaginated(studentId, page, pageSize, section);
      setLoading(false);
    };

    fetchActivities();
  }, [studentId, page, pageSize, section]);

  useEffect(() => {
    localStorage.setItem('actividadActualPage', String(page));
  }, [page]);

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
  };

  const handleSectionChange = (event: any) => {
    setSection(event.target.value);
    setPage(1);
  };

  const sections = [
    { value: '', label: 'Todas las secciones' },
    { value: '1ro Secundaria', label: '1ro Secundaria' },
    { value: '2do Secundaria', label: '2do Secundaria' },
    { value: '3ro Secundaria', label: '3ro Secundaria' },
    { value: '4to Secundaria', label: '4to Secundaria' },
    { value: '5to Secundaria', label: '5to Secundaria' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 6, fontFamily: 'Press Start 2P', minHeight: '80vh' }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, bgcolor: 'rgb(13, 55, 69)', color: 'white' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#FFCC00' }}>
          ✨ Tienda de Actividades Pokémon ✨
        </Typography>
        
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 250, bgcolor: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}>
            <InputLabel sx={{ color: '#FFCC00' }}>Filtrar por sección</InputLabel>
            <Select
              value={section}
              label="Filtrar por sección"
              onChange={handleSectionChange}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFCC00',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFCC00',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFCC00',
                },
                '& .MuiSvgIcon-root': {
                  color: '#FFCC00',
                },
              }}
            >
              {sections.map((sectionOption) => (
                <MenuItem key={sectionOption.value} value={sectionOption.value}>
                  {sectionOption.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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
                    section={activity.section}
                    createdAt={activity.createdAt}
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