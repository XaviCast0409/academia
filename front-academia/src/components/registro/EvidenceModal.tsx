import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  IconButton,
  DialogActions,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface Props {
  open: boolean;
  images: string[] | null;
  onClose: () => void;
}

export const EvidenceModal = ({ open, images, onClose }: Props) => {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Evidencias del Estudiante
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {images?.map((url, i) => (
            <Grid key={i}>
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
                }}
                onClick={() => setZoomedImage(url)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
      </DialogActions>

      {/* Imagen ampliada */}
      {zoomedImage && (
        <Dialog open={true} onClose={() => setZoomedImage(null)} maxWidth="lg">
          <DialogTitle>
            <IconButton onClick={() => setZoomedImage(null)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src={zoomedImage}
              alt="Zoomed"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: 8,
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
};
