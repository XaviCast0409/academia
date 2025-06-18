import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';

const sections = ['1ro Sec', '2do Sec', '3ro Sec', '4to Sec', '5to Sec'];

export const UpdateSectionAlert = () => {
  const { user, updateUser } = useUserStore();
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (user.section === 'default') {
      setOpen(true);
    }
  }, [user.section]);

  const handleSubmit = async () => {
    if (selectedSection) {
      await updateUser(user.id.toString(), { section: selectedSection });
      setOpen(false);
    }
  };

  return (
    user.section === 'default' && (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #E07F3F, #84341C)',
          color: '#fff',
          borderRadius: 4,
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          mx: 'auto',
          mt: 4,
          maxWidth: isMobile ? 360 : 600,
          px: 3,
          py: 2,
          border: '4px solid #FFCC00',
          textAlign: 'center',
          fontFamily: "'Press Start 2P', cursive"
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#FFCC00' }}>
          ¡Actualiza tu sección!
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Para continuar, selecciona tu sección correspondiente.
        </Typography>
        <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
          Elegir sección
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
          <DialogTitle sx={{ fontFamily: "'Press Start 2P', cursive" }}>Selecciona tu sección</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="section-label">Sección</InputLabel>
              <Select
                labelId="section-label"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                label="Sección"
              >
                {sections.map((sec) => (
                  <MenuItem key={sec} value={sec}>
                    {sec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="error">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="success">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    )
  );
};