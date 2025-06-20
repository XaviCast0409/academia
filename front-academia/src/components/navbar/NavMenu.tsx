import { 
  Button, 
  Box, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Divider 
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FolderIcon from '@mui/icons-material/Folder';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { User } from '../../types/user';

interface NavMenuProps {
  user: User;
}

export const NavMenu = ({ user }: NavMenuProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (user.roleId !== 2) return null;

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuType: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuType);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box display="flex" gap={2} ml={4}>
      {/* Cosas por hacer */}
      <Button 
        onClick={(e) => handleMenuClick(e, 'cosas-por-hacer')}
        sx={{ 
          color: '#FFF', 
          fontFamily: "inherit",
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          }
        }}
        startIcon={<CheckCircleIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Cosas por hacer
      </Button>

      {/* Mi progreso */}
      <Button 
        onClick={(e) => handleMenuClick(e, 'mi-progreso')}
        sx={{ 
          color: '#FFF', 
          fontFamily: "inherit",
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          }
        }}
        startIcon={<TrendingUpIcon />}
        endIcon={<ExpandMoreIcon />}
      >
        Mi progreso
      </Button>

      {/* Productos */}
      <Button 
        onClick={() => navigate('/users/shop')} 
        sx={{ 
          color: '#FFF', 
          fontFamily: "inherit",
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.1)',
          }
        }}
        startIcon={<ShoppingCartIcon />}
      >
        Productos
      </Button>

      {/* Menú desplegable - Cosas por hacer */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'cosas-por-hacer'}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#0D3745',
            color: '#FFF',
            mt: 1,
            minWidth: 220,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          },
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: 'rgba(224, 127, 63, 0.2)',
            },
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/users/actividades')}>
          <ListItemIcon>
            <AssignmentIcon sx={{ color: '#E07F3F' }} />
          </ListItemIcon>
          <ListItemText>Actividades disponibles</ListItemText>
        </MenuItem>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <MenuItem onClick={() => handleNavigation('/users/misiones')}>
          <ListItemIcon>
            <EmojiEventsIcon sx={{ color: '#E07F3F' }} />
          </ListItemIcon>
          <ListItemText>Mis misiones</ListItemText>
        </MenuItem>
      </Menu>

      {/* Menú desplegable - Mi progreso */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu === 'mi-progreso'}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#0D3745',
            color: '#FFF',
            mt: 1,
            minWidth: 220,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          },
          '& .MuiMenuItem-root': {
            '&:hover': {
              backgroundColor: 'rgba(224, 127, 63, 0.2)',
            },
          },
        }}
      >
        <MenuItem onClick={() => handleNavigation('/users/evidences')}>
          <ListItemIcon>
            <FolderIcon sx={{ color: '#E07F3F' }} />
          </ListItemIcon>
          <ListItemText>Mis evidencias</ListItemText>
        </MenuItem>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <MenuItem onClick={() => handleNavigation('/users/transactions')}>
          <ListItemIcon>
            <ReceiptIcon sx={{ color: '#E07F3F' }} />
          </ListItemIcon>
          <ListItemText>Mis transacciones</ListItemText>
        </MenuItem>
        <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <MenuItem onClick={() => handleNavigation('/users/ranking')}>
          <ListItemIcon>
            <LeaderboardIcon sx={{ color: '#E07F3F' }} />
          </ListItemIcon>
          <ListItemText>Ver ranking</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}; 