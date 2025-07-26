import { Container, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { useActivityStore } from '../../store/activityStore';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ActivityCard } from "./ActivityCard";
import { 
  PageHeader, 
  LoadingSpinner, 
  EmptyState, 
  ConfirmDialog, 
  Pagination 
} from '../common';
import { SectionSelector } from '../ui';
import { 
  usePagination, 
  useConfirmDialog, 
  getCurrentUser
} from '../../shared';

export const ActivityPage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  
  const { 
    activities, 
    getActivityByProfessorPaginated, 
    removeActivity,
    totalPages,
  } = useActivityStore();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') || '1');
  
  const {
    currentPage,
    setCurrentPage,
  } = usePagination({ initialPage });

  const {
    isOpen: confirmOpen,
    config: confirmConfig,
    openConfirmDialog,
    closeConfirmDialog,
    handleConfirm,
  } = useConfirmDialog();

  const [professorId, setProfessorId] = useState<number | null>(null);
  const [section, setSection] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  // Obtener professorId del usuario actual
  useEffect(() => {
    if (user?.id) {
      setProfessorId(user.id);
    }
  }, [user]);

  // Cargar actividades cuando cambie professorId, página o sección
  useEffect(() => {
    const fetchActivities = async () => {
      if (!professorId) return;
      setLoading(true);
      await getActivityByProfessorPaginated(professorId, currentPage, pageSize, section);
      setLoading(false);
    };

    fetchActivities();
  }, [professorId, currentPage, section]);

  const handleDelete = (id: number) => {
    openConfirmDialog(
      '¿Estás seguro de que deseas eliminar esta actividad?',
      async () => {
        await removeActivity(id);
        // Recargar actividades después de eliminar
        if (professorId) {
          await getActivityByProfessorPaginated(professorId, currentPage, pageSize, section);
        }
      },
      {
        title: 'Eliminar Actividad',
        destructive: true,
      }
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
    setCurrentPage(1);
    setSearchParams({ page: '1' });
  };

  const handleAddActivity = () => {
    navigate("/admin/actividad");
  };

  if (loading) {
    return <LoadingSpinner message="Cargando actividades..." />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <PageHeader
        title="📘 Actividades Registradas"
        actionButton={{
          label: "Agregar Actividad",
          onClick: handleAddActivity,
          icon: <AddCircleOutlineIcon />,
        }}
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
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={() => handleDelete(activity.id)}
              currentPage={currentPage}
            />
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyState
          title="No se encontraron actividades registradas"
          description="Comienza creando tu primera actividad para los estudiantes"
          action={
            <Button 
              variant="contained" 
              onClick={handleAddActivity}
              startIcon={<AddCircleOutlineIcon />}
            >
              Crear Primera Actividad
            </Button>
          }
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={closeConfirmDialog}
        onConfirm={handleConfirm}
        title={confirmConfig?.title || 'Confirmar acción'}
        message={confirmConfig?.message || ''}
        destructive={confirmConfig?.destructive}
      />
    </Container>
  );
};
