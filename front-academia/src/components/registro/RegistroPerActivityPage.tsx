// RegistroPerActivityPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, List, Pagination } from "@mui/material";
import { useEvidenceStore } from "../../store/evidenceStore";
import { EvidenceItem } from "./EvidenceItem";
import { EvidenceModal } from "./EvidenceModal";

export const RegistroPerActivityPage = () => {
  const { id } = useParams<{ id: string }>();
  const activityId = Number(id);

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
