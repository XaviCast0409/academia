import {
  Box,
  Container,
  Typography,
  Button,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { useActivityStore } from '../../store/activityStore';
import { useNavigate, useSearchParams } from 'react-router-dom'; // ✅ importamos useSearchParams
import { ConfirmDialog } from '../../utils/ConfirmDialog';
import { ActivityCard } from "./ActivityCard";

export const ActivityPage = () => {
  const navigate = useNavigate();
  const { activities, fetchActivities, removeActivity } = useActivityStore();

  const [searchParams, setSearchParams] = useSearchParams(); // ✅
  const initialPage = parseInt(searchParams.get('page') || '1');
  const [page, setPage] = useState(initialPage);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const ACTIVITIES_PER_PAGE = 10;
  const totalPages = Math.ceil(activities.length / ACTIVITIES_PER_PAGE);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const paginatedActivities = activities.slice(
    (page - 1) * ACTIVITIES_PER_PAGE,
    page * ACTIVITIES_PER_PAGE
  );

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) {
      await removeActivity(selectedId);
      setConfirmOpen(false);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setSearchParams({ page: value.toString() }); // ✅ actualiza la URL
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexDirection={isMobile ? 'column' : 'row'}
        gap={2}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, color: '#0D3745', textAlign: isMobile ? 'center' : 'left' }}
        >
          📘 Actividades Registradas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => navigate("/admin/actividad")}
          sx={{
            backgroundColor: '#0D3745',
            '&:hover': { backgroundColor: '#84341C' },
            color: '#fff',
            fontWeight: 600,
          }}
        >
          Agregar Actividad
        </Button>
      </Box>

      {activities.length > 0 ? (
        <>
          {paginatedActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={() => handleDelete(activity.id)}
              currentPage={page} // ✅ se mantiene el estado actual
            />
          ))}

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
            No se encontraron actividades registradas.
          </Typography>
        </Box>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Actividad"
        message="¿Estás seguro de que deseas eliminar esta actividad?"
      />
    </Container>
  );
};

export default ActivityPage;
