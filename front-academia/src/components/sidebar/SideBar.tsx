// src/components/sidebar/SideBar.tsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const SIDEBAR_WIDTH = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { text: 'Dashboard', path: '/admin' },
    { text: 'Subir Actividad', path: '/admin/actividad' },
    { text: 'Subir Recompensa', path: '/admin/recompensa' },
    { text: 'Lista de Actividades', path: '/admin/actividad-list' },
  ];

  if (isMobile) return null; // Oculta el sidebar en móvil

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          backgroundColor: '#0D3745',
          color: '#FFFFFF',
          borderRight: 'none',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map(({ text, path }) => {
            const isActive = location.pathname === path;
            return (
              <ListItemButton
                key={text}
                onClick={() => navigate(path)}
                sx={{
                  backgroundColor: isActive ? '#E07F3F' : 'transparent',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#84341C' },
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
