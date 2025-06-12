import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const SIDEBAR_WIDTH = 240;

interface NavbarProps {
  admin?: boolean;
}

const ResponsiveNavbar: React.FC<NavbarProps> = ({ admin = false }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };
  const handleLogin = () => navigate('/login');
  const goToProfile = () => {
    navigate('/users/profile');
    handleClose();
  };

  const mobileDrawer = (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          backgroundColor: '#0D3745',
          color: '#FFFFFF',
        },
      }}
    >
      <List>
        <ListItemButton onClick={() => { navigate('/admin'); setMobileMenuOpen(false); }}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/actividad'); setMobileMenuOpen(false); }}>
          <ListItemText primary="Subir Actividad" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/recompensa'); setMobileMenuOpen(false); }}>
          <ListItemText primary="Subir Recompensa" />
        </ListItemButton>
        <ListItemButton onClick={() => { navigate('/admin/actividad-list'); setMobileMenuOpen(false); }}>
          <ListItemText primary="Lista de Actividades" />
        </ListItemButton>
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#E07F3F',
          width: admin && !isMobile ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
          ml: admin && !isMobile ? `${SIDEBAR_WIDTH}px` : 0,
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          {admin && isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 'bold', color: '#FFFFFF' }}
            onClick={() => navigate(user ? (user.roleId === 1 ? '/admin' : '/users/profile') : '/')}
          >
            Mi Proyecto
          </Typography>
          {user ? (
            <>
              <IconButton onClick={handleMenuClick} size="large">
                <Avatar
                  src={user?.pokemon?.imageUrl}
                  alt={user?.pokemon?.name}
                  sx={{ bgcolor: '#E07F3F', color: '#fff' }}
                >
                  {!user?.pokemon?.imageUrl && <AccountCircleIcon />}
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
                  },
                }}
              >
                {user.roleId === 2 && (
                  <MenuItem key="perfil" onClick={goToProfile}>Perfil</MenuItem>
                )}
                {user.roleId === 2 && (
                  <MenuItem key="actividades" onClick={() => navigate('/users/actividades')}>Panel de Actividades</MenuItem>
                )}
                {user.roleId === 2 && (
                  <MenuItem key="shop" onClick={() => navigate('/users/shop')}>Panel de Productos</MenuItem>
                )}
                {user.roleId === 2 && (
                  <MenuItem key="transactions" onClick={() => navigate('/users/transactions')}>Mis Transacciones</MenuItem>
                )}
                <MenuItem key="session" onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="contained"
              onClick={handleLogin}
              sx={{
                backgroundColor: '#E07F3F',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#C76F2F',
                },
              }}
            >
              Iniciar sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {mobileDrawer}
    </>
  );
};

export default ResponsiveNavbar;
