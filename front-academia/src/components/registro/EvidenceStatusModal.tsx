// components/EvidenceStatusModal.tsx
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

  const handleSubmit = () => {
    onSubmit(status);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cambiar estado de la evidencia</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Nuevo Estado</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as "approved" | "rejected")}
            label="Nuevo Estado"
          >
            <MenuItem value="approved">Aprobado</MenuItem>
            <MenuItem value="rejected">Rechazado</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
