import {
  Box,
  Container,
  Typography,
  Button,
  Pagination,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import { useActivityStore } from '../../store/activityStore';
import { useNavigate, useSearchParams } from 'react-router-dom'; // ✅ importamos useSearchParams
import { ConfirmDialog } from '../../utils/ConfirmDialog';
import { ActivityCard } from "./ActivityCard";

export const ActivityPage = () => {
  const navigate = useNavigate();
  const { 
    activities, 
    getActivityByProfessorPaginated, 
    removeActivity,
    totalPages,
  } = useActivityStore();

  const [searchParams, setSearchParams] = useSearchParams(); // ✅
  const initialPage = parseInt(searchParams.get('page') || '1');
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [professorId, setProfessorId] = useState<number | null>(null);
  const [section, setSection] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const pageSize = 10;

  // Obtener professorId del token
  useEffect(() => {
    const token = localStorage.getItem('auth-storage');
    if (!token) return;
    const payload = JSON.parse(atob(token.split('.')[1]));
    setProfessorId(payload.id);
  }, []);

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
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) {
      await removeActivity(selectedId);
      setConfirmOpen(false);
      // Recargar actividades después de eliminar
      if (professorId) {
        await getActivityByProfessorPaginated(professorId, currentPage, pageSize, section);
      }
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    setSearchParams({ page: value.toString() }); // ✅ actualiza la URL
  };

  const handleSectionChange = (event: any) => {
    setSection(event.target.value);
    setCurrentPage(1); // Resetear a la primera página cuando cambie el filtro
    setSearchParams({ page: '1' });
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

      {/* Filtro por sección */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={{ minWidth: 250 }}>
          <InputLabel>Filtrar por sección</InputLabel>
          <Select
            value={section}
            label="Filtrar por sección"
            onChange={handleSectionChange}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0D3745',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#84341C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#84341C',
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
          <CircularProgress sx={{ color: '#0D3745' }} />
        </Box>
      ) : activities.length > 0 ? (
        <>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={() => handleDelete(activity.id)}
              currentPage={currentPage} // ✅ se mantiene el estado actual
            />
          ))}

          {totalPages > 1 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#0D3745',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#84341C !important',
                    color: '#fff !important',
                  },
                }}
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
