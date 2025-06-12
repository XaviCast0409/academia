import {
  Box,
  ListItem,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useState } from "react";
import { EvidenceStatusModal } from "./EvidenceStatusModal";
import { useActivityStore } from "../../store/activityStore";
import { useEvidenceStore } from "../../store/evidenceStore";
import type { Evidence } from "../../types/evidence";

interface Props {
  evidence: Evidence;
  onReview: (images: string[]) => void;
}

export const EvidenceItem = ({ evidence, onReview }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isFinalized = evidence.status === "approved" || evidence.status === "rejected";

  const updateStatus = useActivityStore(
    (state) => state.changeEvidenceStatusAndAddXavicoints
  );
  const updateEvidenceStatus = useEvidenceStore(
    (state) => state.updateEvidenceStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  const handleStatusSubmit = async (newStatus: "approved" | "rejected") => {
    try {
      const updatedActivity = await updateStatus(evidence.activityId, {
        evidenceId: evidence.id,
        status: newStatus,
      });

      // Buscar evidencia actualizada en la respuesta del backend
      const updatedEvidence =
        Array.isArray((updatedActivity as any).evidences)
          ? (updatedActivity as any).evidences.find(
            (ev: Evidence) => ev.id === evidence.id
          )
          : undefined;

      if (updatedEvidence) {
        updateEvidenceStatus(updatedEvidence); // Actualiza Zustand
      }

      setModalOpen(false);
    } catch (error) {
      console.error("Error al actualizar el estado de la evidencia", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 3,
          mb: 3,
          p: 2,
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Alumno: {evidence.studentName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fecha:{" "}
              {evidence.createdAt
                ? new Date(evidence.createdAt).toLocaleString()
                : "Fecha no disponible"}
            </Typography>
          </Box>

          <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1 }}>
            <Chip
              label={evidence.status}
              color={getStatusColor(evidence.status)}
              variant="outlined"
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => onReview(evidence.filePath)}
              disabled={isFinalized}
              sx={{
                backgroundColor: "rgb(132, 52, 28)",
                "&:hover": { backgroundColor: "rgb(13, 55, 69)" },
              }}
            >
              Revisar Evidencias
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModalOpen(true)}
              disabled={isFinalized}
            >
              Cambiar Estado
            </Button>
          </Box>
        </ListItem>
      </Box>

      <EvidenceStatusModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleStatusSubmit}
        initialStatus={evidence.status}
      />
    </>
  );
};
