import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export const useUserStateListener = () => {
  const { user } = useAuthStore();
  const [forceUpdate, setForceUpdate] = useState(0);
  const prevUserRef = useRef(user);

  useEffect(() => {
    // Comparar el usuario actual con el anterior
    if (prevUserRef.current && user && 
        (prevUserRef.current.xaviCoins !== user.xaviCoins ||
         prevUserRef.current.experience !== user.experience ||
         prevUserRef.current.level !== user.level ||
         prevUserRef.current.completedActivities !== user.completedActivities ||
         prevUserRef.current.totalXaviCoins !== user.totalXaviCoins ||
         prevUserRef.current.purchasedItems !== user.purchasedItems)) {
      
      console.log('User state changed, forcing re-render');
      // Forzar re-render del componente
      setForceUpdate(prev => prev + 1);
      prevUserRef.current = user;
    } else {
      prevUserRef.current = user;
    }
  }, [user]);

  // Retornar el usuario actual y el contador de actualización
  return { user, forceUpdate };
}; 