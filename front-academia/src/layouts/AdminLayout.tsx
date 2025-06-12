// src/layouts/AdminLayout.tsx
import { Box, Toolbar } from '@mui/material';
import Navbar from '../components/navbar/NavBar';
import Sidebar from '../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';


const AdminLayout = () => {

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          width: '100%',
        }}
      >
        <Navbar admin={true} />
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
