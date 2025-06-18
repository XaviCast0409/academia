import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SIDEBAR_WIDTH = 240;

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ open, onClose }: MobileDrawerProps) => {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          backgroundColor: '#0D3745',
          color: '#FFFFFF',
          fontFamily: `'Press Start 2P', cursive`,
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => { navigate('/admin'); onClose(); }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/recompensa'); onClose(); }}>
          <ListItemText primary="Subir Recompensa" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/actividad-list'); onClose(); }}>
          <ListItemText primary="Lista de Actividades" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/evidences'); onClose(); }}>
          <ListItemText primary="Evidencias" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}; 