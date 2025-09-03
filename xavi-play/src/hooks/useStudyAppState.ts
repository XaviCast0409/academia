import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useStudyStore, startStudyTimer, stopStudyTimer } from '@/store/studyStore';

/**
 * Hook para controlar el estado de la aplicación durante sesiones de estudio
 * 
 * FUNCIONALIDAD CRÍTICA:
 * - Si el usuario sale de la app o la minimiza, el timer se resetea a cero
 * - El estudiante NO gana puntos si sale de la app
 * - Solo se pueden ganar puntos manteniendo la app activa
 */
export const useStudyAppState = () => {
  const { 
    updateAppState, 
    isTimerRunning, 
    activeSession, 
    resetTimer, 
    cancelSession,
    pauseTimer 
  } = useStudyStore();
  
  const appState = useRef(AppState.currentState);
  const wasActive = useRef(true);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      const currentState = appState.current;
      
      // Actualizar el estado en el store
      updateAppState(nextAppState as any);
      
      // Si la app estaba activa y ahora no lo está (sale o minimiza)
      if (wasActive.current && nextAppState !== 'active') {
        console.log('📱 App went to background/inactive - Stopping study session');
        
        // Si hay una sesión activa y el timer está corriendo
        if (activeSession && isTimerRunning) {
          // 1. Pausar el timer inmediatamente
          pauseTimer();
          
          // 2. Resetear el timer a cero (REQUISITO CRÍTICO)
          resetTimer();
          
          // 3. Cancelar la sesión para que no se ganen puntos
          cancelSession();
          
          // 4. Detener el interval del timer
          stopStudyTimer();
          
          console.log('⏹️ Study session cancelled due to app state change');
          console.log('⚠️ IMPORTANTE: Para ganar XaviCoins, mantén la app activa mientras estudias');
        }
        
        wasActive.current = false;
      } 
      // Si la app vuelve a estar activa y había una sesión activa antes
      else if (!wasActive.current && nextAppState === 'active') {
        console.log('📱 App became active again');
        wasActive.current = true;
        
        // Solo mostrar alerta si había una sesión activa antes
        if (activeSession) {
          // Pequeño delay para asegurar que el estado se actualice correctamente
          setTimeout(() => {
            const { setShowInactivityAlert } = useStudyStore.getState();
            setShowInactivityAlert(true);
          }, 100);
        }
      } 
      // Si la app vuelve a estar activa
      else if (!wasActive.current && nextAppState === 'active') {
        console.log('📱 App became active again');
        wasActive.current = true;
        
        // Nota: NO reanudamos automáticamente la sesión
        // El usuario debe iniciar una nueva sesión si quiere estudiar
      }
      
      appState.current = nextAppState;
    };

    // Suscribirse a cambios de estado de la app
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Inicializar el timer si hay una sesión activa
    if (activeSession && isTimerRunning) {
      startStudyTimer();
    }

    // Cleanup
    return () => {
      subscription?.remove();
      stopStudyTimer();
    };
  }, [activeSession, isTimerRunning, updateAppState, pauseTimer, resetTimer, cancelSession]);

  // Función para iniciar manualmente el timer (solo cuando la app está activa)
  const startTimer = () => {
    if (AppState.currentState === 'active') {
      useStudyStore.getState().startTimer();
      startStudyTimer();
    }
  };

  return {
    isAppActive: appState.current === 'active',
    startTimer,
    stopTimer: () => {
      useStudyStore.getState().pauseTimer();
      stopStudyTimer();
    }
  };
};
