import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { useResponsive } from '../../shared';

interface Props {
  open: boolean;
  images: string[] | null;
  onClose: () => void;
}

export const EvidenceModal = ({ open, images, onClose }: Props) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const { isMobile } = useResponsive();

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          fontFamily: 'Press Start 2P',
          backgroundColor: 'background.paper',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          display: "flex", 
          justifyContent: "space-between",
          fontFamily: 'Press Start 2P',
          fontSize: isMobile ? '0.8rem' : '1rem',
          color: 'primary.main'
        }}
      >
        Evidencias del Estudiante
        <IconButton 
          onClick={onClose}
          sx={{ 
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 2 
          }}
        >
          {images?.map((url, i) => (
            <Box key={i}>
              <img
                src={url}
                alt={`evidence-${i}`}
                style={{
                  width: "100%",
                  height: "auto",
                  cursor: "zoom-in",
                  borderRadius: 8,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                  transition: "transform 0.2s",
                  border: "2px solid #E07F3F"
                }}
                onClick={() => setZoomedImage(url)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
      </DialogActions>

      {/* Imagen ampliada */}
      {zoomedImage && (
        <Dialog 
          open={true} 
          onClose={() => setZoomedImage(null)} 
          maxWidth="lg"
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
            }
          }}
        >
          <DialogTitle
            sx={{
              fontFamily: 'Press Start 2P',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
              color: 'primary.main'
            }}
          >
            Evidencia Ampliada
            <IconButton 
              onClick={() => setZoomedImage(null)}
              sx={{ 
                float: 'right',
                color: 'primary.main'
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <img
              src={zoomedImage}
              alt="Zoomed"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: 8,
                border: "2px solid #E07F3F"
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};
