import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, List, Button } from "@mui/material";
import { useEvidenceStore } from "../../store/evidenceStore";
import { EvidenceItem } from "./EvidenceItem";
import { EvidenceModal } from "./EvidenceModal";
import { useNavigate, useLocation } from "react-router-dom";

import { PageHeader, Pagination } from '../common';
import { useResponsive } from '../../shared';

export const RegistroPerActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.fromPage || 1;
  const { isMobile } = useResponsive();

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

  const handlePageChange = (value: number) => {
    fetchEvidencesByActivity(activityId, value, limit);
  };

  const handleBack = () => {
    navigate(`/admin/actividad-list?page=${fromPage}`);
  };

  return (
    <Box
      sx={{
        py: 5,
        px: 2,
        maxWidth: 'md',
        mx: 'auto',
        fontFamily: 'Press Start 2P'
      }}
    >
      <PageHeader
        title="Registro de Evidencias por Actividad"
        subtitle="Revisa y gestiona las evidencias enviadas"
      />

      <Button
        variant="outlined"
        onClick={handleBack}
        sx={{
          mb: 4,
          backgroundColor: 'transparent',
          borderColor: 'primary.main',
          color: 'primary.main',
          fontSize: isMobile ? '0.6rem' : '0.8rem',
          px: 3,
          py: 1.5,
          fontFamily: 'Press Start 2P',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
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
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>

      <EvidenceModal open={openModal} images={selectedImages} onClose={handleCloseModal} />
    </Box>
  );
};
