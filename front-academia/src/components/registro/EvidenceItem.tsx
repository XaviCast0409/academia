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

import { GameCard } from '../common';
import { useResponsive } from '../../shared';

interface Props {
  evidence: Evidence;
  onReview: (images: string[]) => void;
}

export const EvidenceItem = ({ evidence, onReview }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const isFinalized = evidence.status === "approved" || evidence.status === "rejected";
  const { isMobile } = useResponsive();

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
      <Box sx={{ mb: 3 }}>
        <GameCard>
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              flexDirection: isMobile ? 'column' : 'row',
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: "bold",
                  fontFamily: 'Press Start 2P',
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  color: 'primary.main',
                  mb: 1
                }}
              >
                Alumno: {evidence.studentName}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'Press Start 2P',
                  fontSize: isMobile ? '0.6rem' : '0.7rem'
                }}
              >
                Fecha:{" "}
                {evidence.createdAt
                  ? new Date(evidence.createdAt).toLocaleString()
                  : "Fecha no disponible"}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 1,
              minWidth: isMobile ? '100%' : 'auto',
              alignItems: isMobile ? 'stretch' : 'flex-end'
            }}>
              <Chip
                label={evidence.status.toUpperCase()}
                color={getStatusColor(evidence.status)}
                variant="outlined"
                sx={{
                  fontFamily: 'Press Start 2P',
                  fontSize: '0.6rem'
                }}
              />
              <Button
                variant="contained"
                size="small"
                onClick={() => onReview(evidence.filePath)}
                disabled={isFinalized}
                sx={{
                  backgroundColor: 'primary.main',
                  fontFamily: 'Press Start 2P',
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  py: 1,
                  "&:hover": { 
                    backgroundColor: 'primary.dark' 
                  },
                }}
              >
                Revisar Evidencias
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setModalOpen(true)}
                disabled={isFinalized}
                sx={{
                  fontFamily: 'Press Start 2P',
                  fontSize: isMobile ? '0.6rem' : '0.7rem',
                  py: 1,
                  borderColor: 'primary.main',
                  color: 'primary.main'
                }}
              >
                Cambiar Estado
              </Button>
            </Box>
          </ListItem>
        </GameCard>
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
