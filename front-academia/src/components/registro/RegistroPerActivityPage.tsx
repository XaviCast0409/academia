// RegistroPerActivityPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, List, Pagination, useMediaQuery, Button, useTheme } from "@mui/material";
import { useEvidenceStore } from "../../store/evidenceStore";
import { EvidenceItem } from "./EvidenceItem";
import { EvidenceModal } from "./EvidenceModal";
import { useNavigate, useLocation } from "react-router-dom";

export const RegistroPerActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.fromPage || 1;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    evidences,
    fetchEvidencesByActivity,
    page,
    totalPages,
    limit,
  } = useEvidenceStore();

  const [openModal, setOpenModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null);

  useEffect(() => {
    if (activityId) fetchEvidencesByActivity(activityId, page, limit);
  }, [activityId, page, limit]);

  const handleOpenModal = (images: string[]) => {
    setSelectedImages(images);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImages(null);
    setOpenModal(false);
  };

  const handlePageChange = (_: any, value: number) => {
    fetchEvidencesByActivity(activityId, value, limit);
  };

  const handleBack = () => {
    navigate(`/admin/actividad-list?page=${fromPage}`);
  };

  return (
    <Box p={3} sx={{ backgroundColor: "#fefefe" }}>
      <Typography
        variant="h5"
        mb={4}
        sx={{
          color: "rgb(13, 55, 69)",
          fontWeight: "bold",
          borderBottom: "2px solid rgb(224, 127, 63)",
          pb: 1,
        }}
      >
        Registro de Evidencias por Actividad
      </Typography>

      <Button
        variant="outlined"
        onClick={handleBack} // 👈 aquí
        sx={{
          mb: 4,
          border: '4px solid #84341c',
          color: '#84341c',
          fontSize: isMobile ? '0.7rem' : '1rem',
          px: 3,
          py: 1.5,
          fontFamily: `'Press Start 2P', cursive`,
          '&:hover': {
            backgroundColor: 'rgba(132, 52, 28, 0.1)',
            borderColor: '#E07F3F',
          },
        }}
      >
        ← Volver
      </Button>

      <List>
        {evidences.map((evidence) => (
          <EvidenceItem key={evidence.id} evidence={evidence} onReview={handleOpenModal} />
        ))}
      </List>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      <EvidenceModal open={openModal} images={selectedImages} onClose={handleCloseModal} />
    </Box>
  );
};
