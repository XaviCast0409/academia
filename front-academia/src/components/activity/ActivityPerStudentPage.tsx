import { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Box,
} from '@mui/material';
import { useActivityStore } from '../../store/activityStore';
import ActivityCardStudent from './ActivityCardStudent';
import { 
  PageHeader, 
  LoadingSpinner, 
  EmptyState, 
  Pagination 
} from '../common';
import { SectionSelector } from '../ui';
import { 
  usePagination, 
  getCurrentUser
} from '../../shared';

export const AvailableActivities = () => {
  const user = getCurrentUser();
  const {
    activities,
    getAvailableActivitiesForStudentPaginated,
    totalPages,
  } = useActivityStore();

  const [studentId, setStudentId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState<string>('');
  
  const {
    currentPage,
    setCurrentPage,
  } = usePagination({ initialPage: 1 });

  const pageSize = 12;

  // Obtener studentId del usuario actual
  useEffect(() => {
    if (user?.id) {
      setStudentId(user.id);
    }
  }, [user]);

  // Cargar actividades cuando cambie studentId, página o sección
  useEffect(() => {
    const fetchActivities = async () => {
      if (!studentId) return;
      setLoading(true);
      await getAvailableActivitiesForStudentPaginated(studentId, currentPage, pageSize, section);
      setLoading(false);
    };

    fetchActivities();
  }, [studentId, currentPage, pageSize, section]);

  // Persistir página actual en localStorage
  useEffect(() => {
    localStorage.setItem('actividadActualPage', String(currentPage));
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando actividades disponibles..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <PageHeader
        title="✨ Tienda de Actividades Pokémon ✨"
        subtitle="Explora las actividades disponibles y mejora tus habilidades"
      >
        {/* Filtro por sección */}
        <SectionSelector
          value={section}
          onChange={handleSectionChange}
          label="Filtrar por sección"
        />
      </PageHeader>

      {activities.length > 0 ? (
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

          <Box sx={{ mt: 4 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      ) : (
        <EmptyState
          title="No hay actividades disponibles"
          description="No se encontraron actividades que coincidan con los filtros seleccionados"
        />
      )}
    </Container>
  );
};
