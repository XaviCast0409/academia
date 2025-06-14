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
  useTheme,
  Box
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
          fontFamily: `'Press Start 2P', cursive`,
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
          backgroundColor: '#0D3745',
          width: admin && !isMobile ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
          ml: admin && !isMobile ? `${SIDEBAR_WIDTH}px` : 0,
          boxShadow: 'none',
          fontFamily: `'Press Start 2P', cursive`,
        }}
      >
        <Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            {admin && isMobile && (
              <IconButton edge="start" color="inherit" onClick={() => setMobileMenuOpen(true)} sx={{ mr: 2 }}>
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', color: '#E07F3F', fontWeight: 'bold', fontSize: '1rem', fontFamily: `'Press Start 2P', cursive` }}
              onClick={() => navigate(user ? (user.roleId === 1 ? '/admin' : '/users/profile') : '/')}
            >
              🎮 Xavi Play
            </Typography>
          </Box>

          {!isMobile && (
            <Box display="flex" gap={3} ml={4}>
              {user?.roleId === 2 && (
                <Button onClick={() => {navigate('/users/actividades'); setMobileMenuOpen(false)}} sx={{ color: '#FFF', fontFamily:"inherit" }} >Actividades</Button>
              )}
              {user?.roleId === 2 && (
                <Button onClick={() => {navigate('/users/shop'); setMobileMenuOpen(false)}} sx={{ color: '#FFF', fontFamily:"inherit" }}>Productos</Button>
              )}
              {user?.roleId === 2 && (
                <Button onClick={() => {navigate('/users/transactions'); setMobileMenuOpen(false)}} sx={{ color: '#FFF', fontFamily:"inherit" }}>Transacciones</Button>
              )}
            </Box>
          )}

          {user ? (
            <>
              <IconButton onClick={handleMenuClick} size="large">
                <Avatar
                  src={user?.pokemon?.imageUrl}
                  alt={user?.pokemon?.name}
                  sx={{ bgcolor: '#E07F3F', color: '#fff', width: 50, height: 50 }}
                >
                  {!user?.pokemon?.imageUrl && <AccountCircleIcon fontSize="large" />}
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
                {user.roleId === 2 && (
                  <MenuItem onClick={goToProfile} sx={{fontFamily: "inherit"}}>Perfil</MenuItem>
                )}
                {user.roleId === 2 && isMobile && (
                  <MenuItem onClick={() => navigate('/users/actividades')} sx={{fontFamily: "inherit"}}>Actividades</MenuItem>
                )}
                {user.roleId === 2 && isMobile && (
                  <MenuItem onClick={() => navigate('/users/shop')} sx={{fontFamily: "inherit"}}>Productos</MenuItem>
                )}
                {user.roleId === 2 && isMobile && (
                  <MenuItem onClick={() => navigate('/users/transactions')} sx={{fontFamily: "inherit"}}>Transacciones</MenuItem>
                )}
                
                <MenuItem onClick={handleLogout} sx={{fontFamily: "inherit"}}>Cerrar sesión</MenuItem>
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
                fontFamily: `'Press Start 2P', cursive`,
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