import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

import { useResponsive } from '../../shared';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (status: "approved" | "rejected") => void;
  initialStatus: "approved" | "rejected" | "pending";
}

export const EvidenceStatusModal = ({ open, onClose, onSubmit, initialStatus }: Props) => {
  const [status, setStatus] = useState<"approved" | "rejected">(
    initialStatus === "pending" ? "approved" : initialStatus
  );
  const { isMobile } = useResponsive();

  const handleSubmit = () => {
    onSubmit(status);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          fontFamily: 'Press Start 2P',
          backgroundColor: 'background.paper',
        }
      }}
    >
      <DialogTitle
        sx={{
          fontFamily: 'Press Start 2P',
          fontSize: isMobile ? '0.8rem' : '1rem',
          color: 'primary.main'
        }}
      >
        Cambiar estado de la evidencia
      </DialogTitle>
      <DialogContent>
        <FormControl 
          fullWidth 
          sx={{ 
            mt: 2,
            '& .MuiInputLabel-root': {
              fontFamily: 'Press Start 2P',
              fontSize: '0.8rem'
            },
            '& .MuiSelect-select': {
              fontFamily: 'Press Start 2P',
              fontSize: '0.8rem'
            }
          }}
        >
          <InputLabel>Nuevo Estado</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as "approved" | "rejected")}
            label="Nuevo Estado"
          >
            <MenuItem 
              value="approved"
              sx={{
                fontFamily: 'Press Start 2P',
                fontSize: '0.7rem',
                color: 'success.main'
              }}
            >
              ✅ Aprobado
            </MenuItem>
            <MenuItem 
              value="rejected"
              sx={{
                fontFamily: 'Press Start 2P',
                fontSize: '0.7rem',
                color: 'error.main'
              }}
            >
              ❌ Rechazado
            </MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={onClose}
          sx={{
            fontFamily: 'Press Start 2P',
            fontSize: '0.7rem',
            color: 'text.secondary'
          }}
        >
          Cancelar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          sx={{
            fontFamily: 'Press Start 2P',
            fontSize: '0.7rem',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark'
            }
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
