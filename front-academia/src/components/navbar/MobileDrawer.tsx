import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FolderIcon from '@mui/icons-material/Folder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import ListAltIcon from '@mui/icons-material/ListAlt';

const SIDEBAR_WIDTH = 240;

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export const MobileDrawer = ({ open, onClose, isAdmin = false }: MobileDrawerProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

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
      {isAdmin ? (
        // Menú para administradores
        <List>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="h6" sx={{ color: '#E07F3F', fontWeight: 600 }}>
              Panel Admin
            </Typography>
          </Box>

          <ListItemButton onClick={() => handleNavigation('/admin')}>
            <ListItemIcon>
              <DashboardIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/admin/recompensa')}>
            <ListItemIcon>
              <CardGiftcardIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Subir Recompensa" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/admin/actividad-list')}>
            <ListItemIcon>
              <ListAltIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Lista de Actividades" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/admin/evidences')}>
            <ListItemIcon>
              <FolderIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Evidencias" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/admin/transactions')}>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Transacciones" />
          </ListItemButton>
        </List>
      ) : (
        // Menú para usuarios
        <List>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <Typography variant="h6" sx={{ color: '#E07F3F', fontWeight: 600 }}>
              Menú Usuario
            </Typography>
          </Box>

          {/* Cosas por hacer */}
          <Box sx={{ p: 1, pt: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#E07F3F', fontWeight: 600, px: 2, mb: 1 }}>
              Cosas por hacer
            </Typography>
          </Box>

          <ListItemButton onClick={() => handleNavigation('/users/actividades')}>
            <ListItemIcon>
              <AssignmentIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Actividades disponibles" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/users/misiones')}>
            <ListItemIcon>
              <EmojiEventsIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Mis misiones" />
          </ListItemButton>

          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', my: 1 }} />

          {/* Productos */}
          <ListItemButton onClick={() => handleNavigation('/users/shop')}>
            <ListItemIcon>
              <ShoppingCartIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItemButton>

          <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', my: 1 }} />

          {/* Mi progreso */}
          <Box sx={{ p: 1, pt: 2 }}>
            <Typography variant="subtitle2" sx={{ color: '#E07F3F', fontWeight: 600, px: 2, mb: 1 }}>
              Mi progreso
            </Typography>
          </Box>

          <ListItemButton onClick={() => handleNavigation('/users/evidences')}>
            <ListItemIcon>
              <FolderIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Mis evidencias" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/users/transactions')}>
            <ListItemIcon>
              <ReceiptIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Mis transacciones" />
          </ListItemButton>

          <ListItemButton onClick={() => handleNavigation('/users/ranking')}>
            <ListItemIcon>
              <LeaderboardIcon sx={{ color: '#E07F3F' }} />
            </ListItemIcon>
            <ListItemText primary="Ver ranking" />
          </ListItemButton>
        </List>
      )}
    </Drawer>
  );
}; 