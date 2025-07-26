import {
  Box,
  Typography,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";

import type { Activity } from "../../types/activity";
import { GameCard } from '../common';
import { DifficultyBadge, XavicoinsDisplay } from '../ui';
import { useResponsive } from '../../shared';

interface Props {
  activity: Activity;
  onDelete: () => void;
  currentPage: number;
}

export const ActivityCard = ({ activity, onDelete, currentPage }: Props) => {
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/actividad/registroEvidence/${activity.id}`, {
      state: { fromPage: currentPage },
    });
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <GameCard
      onClick={handleClick}
      hover={true}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
          transition: 'transform 0.15s',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        {/* Imagen miniatura */}
        <Box
          component="img"
          src={
            activity.images?.[0] ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png"
          }
          alt="Actividad"
          sx={{
            width: isMobile ? "100%" : 110,
            maxHeight: 90,
            objectFit: "cover",
            borderRadius: 2,
            border: "2px solid #e07f3f",
            boxShadow: '0 2px 8px rgba(224,127,63,0.10)',
            mb: isMobile ? 2 : 0,
          }}
        />

        {/* Información */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <EventNoteIcon sx={{ color: "#E07F3F" }} />
            <Typography fontWeight={700} fontSize={isMobile ? "1rem" : "1.15rem"} color="#0D3745" noWrap>
              {activity.title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <DescriptionIcon sx={{ color: "#0D3745" }} />
            <Typography
              fontSize={isMobile ? "0.9rem" : "1rem"}
              color="#555"
              sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}
            >
              {activity.description || "Sin descripción"}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <DifficultyBadge difficulty={(activity.difficulty || 'beginner') as 'beginner' | 'intermediate' | 'advanced' | 'expert'} />
          </Box>

          {activity.section && (
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <SchoolIcon sx={{ color: "#1976d2" }} />
              <Typography
                fontSize={isMobile ? "0.85rem" : "0.95rem"}
                fontWeight={600}
                color="#1976d2"
              >
                {activity.section}
              </Typography>
            </Box>
          )}

          <Box display="flex" alignItems="center" gap={1}>
            <XavicoinsDisplay amount={activity.xavicoints} size="small" />
          </Box>
        </Box>

        {/* Botón Eliminar */}
        <Box
          sx={{
            mt: isMobile ? 2 : 0,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            sx={{
              borderColor: '#84341c',
              color: '#fff',
              background: '#84341c',
              fontWeight: 700,
              '&:hover': {
                background: '#E07F3F',
                borderColor: '#E07F3F',
                color: '#fff',
              },
            }}
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </GameCard>
  );
};
