import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const NavLogo = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  return (
    <Typography
      variant="h6"
      sx={{ 
        cursor: 'pointer', 
        color: '#E07F3F', 
        fontWeight: 'bold', 
        fontSize: '1rem', 
        fontFamily: `'Press Start 2P', cursive` 
      }}
      onClick={() => navigate(user ? (user.roleId === 1 ? '/admin' : '/users/profile') : '/')}
    >
      🎮 Xavi Play
    </Typography>
  );
}; 