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
import { useNavigate } from "react-router-dom";

import type { Activity } from "../../types/activity";

interface Props {
  activity: Activity;
  onDelete: () => void;
  currentPage: number; // 👈 nuevo prop
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

  return (
    <Box
      onClick={handleClick}
      sx={{
        px: 2,
        py: 2,
        mb: 2,
        bgcolor: '#fdfdfd',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
        '&:hover': { backgroundColor: '#f8f8f8', cursor: 'pointer' },
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
            width: isMobile ? "100%" : 100,
            maxHeight: 80,
            objectFit: "cover",
            borderRadius: 1,
            border: "1px solid #ddd",
          }}
        />

        {/* Información */}
        <Box sx={{ flex: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <EventNoteIcon sx={{ color: "#E07F3F" }} />
            <Typography fontWeight={600} fontSize={isMobile ? "0.9rem" : "1rem"}>
              {activity.title}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <DescriptionIcon sx={{ color: "#0D3745" }} />
            <Typography
              fontSize={isMobile ? "0.8rem" : "0.9rem"}
              color="#555"
            >
              {activity.description || "Sin descripción"}
            </Typography>
          </Box>
        </Box>

        {/* Botón Eliminar */}
        <Box
          onClick={(e) => e.stopPropagation()} // Previene navegar al hacer clic en Eliminar
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
          >
            Eliminar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
