// Obtener información del token JWT
export const getTokenPayload = (token?: string): any | null => {
  const authToken = token || localStorage.getItem('auth-storage');
  if (!authToken) return null;
  
  try {
    const payload = JSON.parse(atob(authToken.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

// Verificar si el token está expirado
export const isTokenExpired = (token?: string): boolean => {
  const payload = getTokenPayload(token);
  if (!payload || !payload.exp) return true;
  
  return Date.now() >= payload.exp * 1000;
};

// Obtener información del usuario actual
export const getCurrentUser = () => {
  return getTokenPayload();
};

// Verificar si el usuario tiene un rol específico
export const hasRole = (requiredRole: number): boolean => {
  const user = getCurrentUser();
  return user?.roleId === requiredRole;
};

// Verificar si el usuario es admin
export const isAdmin = (): boolean => {
  return hasRole(1);
};

// Verificar si el usuario es profesor
export const isProfessor = (): boolean => {
  return hasRole(2);
};

// Verificar si el usuario es estudiante
export const isStudent = (): boolean => {
  return hasRole(3);
};
