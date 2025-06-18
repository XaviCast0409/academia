import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: number[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, token } = useAuthStore();
  const location = useLocation();

  // Verificar si el token ha expirado (2 horas)
  const isTokenExpired = () => {
    if (!token) return true;
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
    return Date.now() >= expirationTime;
  };

  if (!isAuthenticated || !user || isTokenExpired()) {
    // Redirigir al login si no está autenticado o el token expiró
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Verificar si el usuario tiene el rol permitido
  if (!allowedRoles.includes(user.roleId)) {
    // Redirigir a la página principal si no tiene el rol permitido
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 