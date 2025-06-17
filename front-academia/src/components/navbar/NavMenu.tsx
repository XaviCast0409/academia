import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../types/user';

interface NavMenuProps {
  user: User;
}

export const NavMenu = ({ user }: NavMenuProps) => {
  const navigate = useNavigate();

  if (user.roleId !== 2) return null;

  return (
    <Box display="flex" gap={3} ml={4}>
      <Button 
        onClick={() => navigate('/users/actividades')} 
        sx={{ color: '#FFF', fontFamily: "inherit" }}
      >
        Actividades
      </Button>
      <Button 
        onClick={() => navigate('/users/shop')} 
        sx={{ color: '#FFF', fontFamily: "inherit" }}
      >
        Productos
      </Button>
      <Button 
        onClick={() => navigate('/users/transactions')} 
        sx={{ color: '#FFF', fontFamily: "inherit" }}
      >
        Transacciones
      </Button>
      <Button 
        onClick={() => navigate('/users/evidences')} 
        sx={{ color: '#FFF', fontFamily: "inherit" }}
      >
        Evidencias
      </Button>
    </Box>
  );
}; 