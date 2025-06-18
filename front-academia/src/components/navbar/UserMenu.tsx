import { IconButton, Avatar, Menu, MenuItem, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/user';

interface UserMenuProps {
  user: User;
  onLogout: () => void;
  isMobile: boolean;
}

export const UserMenu = ({ user, onLogout, isMobile }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    onLogout();
    handleClose();
  };
  const goToProfile = () => {
    navigate('/users/profile');
    handleClose();
  };

  const menuItems = [
    ...(user.roleId === 2 ? [
      <MenuItem key="profile" onClick={goToProfile} sx={{ fontFamily: "inherit" }}>
        Perfil
      </MenuItem>
    ] : []),
    ...(user.roleId === 2 && isMobile ? [
      <MenuItem key="activities" onClick={() => {navigate('/users/actividades'); handleClose()}} sx={{ fontFamily: "inherit" }}>
        Actividades
      </MenuItem>,
      <MenuItem key="shop" onClick={() => {navigate('/users/shop'); handleClose()}} sx={{ fontFamily: "inherit" }}>
        Productos
      </MenuItem>,
      <MenuItem key="transactions" onClick={() => {navigate('/users/transactions'); handleClose()}} sx={{ fontFamily: "inherit" }}>
        Transacciones
      </MenuItem>,
      <MenuItem key="evidences" onClick={() => {navigate('/users/evidences'); handleClose()}} sx={{ fontFamily: "inherit" }}>
        Evidencias
      </MenuItem>
    ] : []),
    <MenuItem key="logout" onClick={handleLogout} sx={{ fontFamily: "inherit" }}>
      Cerrar sesión
    </MenuItem>
  ];

  return (
    <Box>
      <IconButton onClick={handleMenuClick} size="large">
        <Avatar
          src={user.pokemon?.imageUrl}
          alt={user.pokemon?.name}
          sx={{ bgcolor: '#E07F3F', color: '#fff', width: 50, height: 50 }}
        >
          {!user.pokemon?.imageUrl && <AccountCircleIcon fontSize="large" />}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            backgroundColor: '#F5E8DC',
            color: '#84341C',
            fontFamily: `'Press Start 2P', cursive`,
          },
        }}
      >
        {menuItems}
      </Menu>
    </Box>
  );
}; 