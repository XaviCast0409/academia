import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { NavLogo } from './NavLogo';
import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';
import { MobileDrawer } from './MobileDrawer';

const SIDEBAR_WIDTH = 240;

interface NavbarProps {
  admin?: boolean;
}

const ResponsiveNavbar: React.FC<NavbarProps> = ({ admin = false }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => navigate('/login');

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
              <IconButton 
                edge="start" 
                color="inherit" 
                onClick={() => setMobileMenuOpen(true)} 
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <NavLogo />
          </Box>

          {user ? (
            <>
              {!isMobile && <NavMenu user={user} />}
              <UserMenu 
                user={user} 
                onLogout={handleLogout} 
                isMobile={isMobile} 
              />
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
      {admin && (
        <MobileDrawer 
          open={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />
      )}
    </>
  );
};

export default ResponsiveNavbar;