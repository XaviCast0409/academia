// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface Props {
  children: React.ReactNode;
  allowedRoles: number[];
}

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.roleId)) return <Navigate to="/unauthorized" />;

  return children;
};
