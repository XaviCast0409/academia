import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import StarsIcon from '@mui/icons-material/Stars';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";

import type { Activity } from "../../types/activity";

interface Props {
  activity: Activity;
  onDelete: () => void;
  currentPage: number;
}

export const ActivityCard = ({ activity, onDelete, currentPage }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/actividad/registroEvidence/${activity.id}`, {
      state: { fromPage: currentPage },
    });
  };

  // Dificultad a color
  const difficultyColors: Record<string, string> = {
    beginner: '#4caf50',
    intermediate: '#1976d2',
    advanced: '#e07f3f',
    expert: '#84341c',
  };

  const difficultyLabels: Record<string, string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
    expert: 'Experto',
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        px: isMobile ? 1 : 3,
        py: isMobile ? 1.5 : 2.5,
        mb: 2,
        bgcolor: '#fdfdfd',
        border: '2px solid #E07F3F',
        borderRadius: 3,
        boxShadow: '0px 4px 16px rgba(13,55,69,0.10)',
        transition: 'transform 0.15s',
        '&:hover': {
          backgroundColor: '#f8f8f8',
          transform: 'scale(1.02)',
          cursor: 'pointer',
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap"
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
            <StarsIcon sx={{ color: difficultyColors[activity.difficulty || 'beginner'] || '#4caf50' }} />
            <Typography
              fontSize={isMobile ? "0.85rem" : "0.95rem"}
              fontWeight={600}
              color={difficultyColors[activity.difficulty || 'beginner'] || '#4caf50'}
            >
              {difficultyLabels[activity.difficulty || 'beginner']}
            </Typography>
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
            <MonetizationOnIcon sx={{ color: "#E07F3F" }} />
            <Typography fontSize={isMobile ? "0.85rem" : "0.95rem"} color="#E07F3F" fontWeight={600}>
              {activity.xavicoints} XaviCoins
            </Typography>
          </Box>
        </Box>

        {/* Botón Eliminar */}
        <Box
          onClick={(e) => e.stopPropagation()}
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
            onClick={onDelete}
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
    </Box>
  );
};
