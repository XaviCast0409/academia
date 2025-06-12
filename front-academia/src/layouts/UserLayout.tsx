// src/layouts/UserLayout.tsx
import Navbar from '../components/navbar/NavBar';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </>
  );
};

export default UserLayout;
