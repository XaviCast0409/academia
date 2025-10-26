import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { studyService } from '@/services/studyService';
import { StudyCard, StudySession, StudyDeck, StudyProgress, StudyStatistics, AnkiCardState, AppState } from '@/types/StudyTypes';

interface StudyStore {
  // Estado general
  isLoading: boolean;
  error: string | null;
  
  // Mazos y tarjetas
  decks: StudyDeck[];
  currentDeck: StudyCard[];
  currentCard: StudyCard | null;
  
  // Sesión de estudio
  activeSession: StudySession | null;
  finishingSession: boolean;
  sessionTimer: number; // segundos
  isTimerRunning: boolean;
  appState: AppState;
  
  // Estado de inactividad
  showInactivityAlert: boolean;
  
  // Estado Anki
  ankiState: AnkiCardState;
  
  // Progreso y estadísticas
  progress: StudyProgress | null;
  statistics: StudyStatistics | null;
  // Acumulador de monedas por cartas (float)
  cardsCoinAccumulator: number;
  
  // Acciones
  loadDecks: () => Promise<void>;
  loadDeckCards: (category: string, mathTopic?: string) => Promise<void>;
  startStudySession: (deckCategory: string, deckMathTopic: string | undefined, sessionGoal: number) => Promise<StudySession>;
  finishStudySession: (cardsStudied: number) => Promise<void>;
  cancelSession: () => Promise<void>;
  
  // Timer y app state
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  updateAppState: (state: AppState) => void;
  
  // Inactividad
  setShowInactivityAlert: (show: boolean) => void;
  
  // Anki functionality
  showAnswer: () => void;
  nextCard: (difficulty: 'again' | 'hard' | 'good' | 'easy') => void;
  recordCardStudy: (cardId: number, difficulty: 'again' | 'hard' | 'good' | 'easy') => Promise<void>;
  
  // Utilidades
  clearError: () => void;
  loadProgress: () => Promise<void>;
  loadStatistics: (timeframe?: 'week' | 'month' | 'year') => Promise<void>;
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  // Estado inicial
  isLoading: false,
  error: null,
  decks: [],
  currentDeck: [],
  currentCard: null,
  activeSession: null,
  finishingSession: false,
  sessionTimer: 0,
  isTimerRunning: false,
  appState: 'active',
  showInactivityAlert: false,
  ankiState: {
    currentCardIndex: 0,
    isShowingAnswer: false,
    cardHistory: []
  },
  progress: null,
  statistics: null,
  cardsCoinAccumulator: 0,

  // Acciones
  loadDecks: async () => {
    try {
      set({ isLoading: true, error: null });
      const decks = await studyService.getStudyDecks();
      set({ decks, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar mazos',
        isLoading: false 
      });
    }
  },

  loadDeckCards: async (category: string, mathTopic?: string) => {
    try {
      set({ isLoading: true, error: null });
      const cards = await studyService.getDeckCards(category, mathTopic);
      
      // Mezclar las tarjetas para mejor experiencia de estudio
      const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
      
      set({ 
        currentDeck: shuffledCards,
        currentCard: shuffledCards[0] || null,
        ankiState: {
          currentCardIndex: 0,
          isShowingAnswer: false,
          cardHistory: []
        },
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar tarjetas',
        isLoading: false 
      });
    }
  },

  startStudySession: async (deckCategory: string, deckMathTopic: string | undefined, sessionGoal: number) => {
    try {
      set({ isLoading: true, error: null });
      
  // Verificar autenticación antes de iniciar sesión
  // Use require fallback to avoid Metro bundler dynamic import issues
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useAuthStore } = require('./authStore');
  const authState = useAuthStore.getState();
      
      // Verificar si hay token y usuario
      if (!authState.isAuthenticated || !authState.user) {
        throw new Error('Debes iniciar sesión para comenzar a estudiar.');
      }
      
      // Validar estado de autenticación
      const isAuthValid = await authState.checkAuthStatus();
      if (!isAuthValid) {
        throw new Error('Tu sesión ha expirado. Por favor, cierra sesión e inicia sesión nuevamente.');
      }
      
      // Verificar si hay una sesión activa
      const existingSession = await studyService.getActiveSession();
      if (existingSession) {
        // En lugar de lanzar error, usar la sesión existente
        console.log('📚 Usando sesión activa existente:', existingSession.id);
        
        // Cargar las tarjetas del mazo
        await get().loadDeckCards(deckCategory, deckMathTopic);
        
        set({ 
          activeSession: existingSession,
          sessionTimer: 0,
          isLoading: false 
        });
        
        return existingSession;
      }
      
      // Incluir información de curso/subtema si vienen como ids (la UI pasa category/mathTopic)
      const courseId = Number(deckCategory);
      const subTopicId = deckMathTopic ? Number(deckMathTopic) : undefined;

      const session = await studyService.startStudySession({
        sessionType: 'general',
        targetDuration: sessionGoal,
        ...(Number.isFinite(courseId) && courseId ? { courseId } : {}),
        ...(subTopicId && Number.isFinite(subTopicId) ? { subTopicId } : {})
      });
      
      // Cargar las tarjetas del mazo
      await get().loadDeckCards(deckCategory, deckMathTopic);

      // reset accumulator persisted
      try { await AsyncStorage.setItem('study:cardsCoinAccumulator', JSON.stringify(0)); } catch (e) { /* ignore */ }
      set({ 
        activeSession: session,
        sessionTimer: 0,
        cardsCoinAccumulator: 0,
        isLoading: false 
      });
      
      return session;
    } catch (error) {
      // Si es error de autenticación, debuggear el estado
      if (error instanceof Error && (
        error.message.includes('expirad') || 
        error.message.includes('401') ||
        error.message.includes('sesión')
      )) {
        // Use require fallback so Metro bundler can resolve the module at bundle time.
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const mod = require('../utils/authDebug');
          const debugAuthState = mod?.debugAuthState || mod?.default?.debugAuthState;
          if (typeof debugAuthState === 'function') await debugAuthState();
        } catch (e) {
          // ignore if debug util is not available in production bundles
          // eslint-disable-next-line no-console
          console.warn('authDebug not available', e);
        }
      }
      
      set({ 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        isLoading: false 
      });
      throw error;
    }
  },

  finishStudySession: async (cardsStudied: number) => {
    const { activeSession, finishingSession } = get();
    if (!activeSession || finishingSession) return;

    try {
      set({ isLoading: true, error: null, finishingSession: true });

      // Guardar id localmente para evitar race conditions
      const sessionId = activeSession.id;

      // leer acumulador persistido
      let persisted = 0;
      try {
        const v = await AsyncStorage.getItem('study:cardsCoinAccumulator');
        if (v) persisted = Number(JSON.parse(v));
      } catch (e) {
        persisted = Number(get().cardsCoinAccumulator || 0);
      }

      const minutesStudied = Math.floor((get().sessionTimer || 0) / 60);
      const cardsCoinsRounded = Math.ceil(persisted || 0);
      const timeCoins = Math.max(0, minutesStudied);

  const totalXavicoins = Math.ceil((cardsCoinsRounded || 0) + (timeCoins || 0));
  // experiencia heuristic: 2xp por carta + 1xp por minuto
  const experienceOverride = (cardsStudied * 2) + (timeCoins * 1);

  const res = await studyService.finishStudySession(sessionId, { cardsStudied, rewardsOverride: { cardsCoinsRounded, timeCoins, totalXavicoins, experience: experienceOverride } }).catch((err: any) => {
        if (err?.response && err.response.status === 404) {
          return null;
        }
        if (err?.response && err.response.status === 400) {
          throw err;
        }
        throw err;
      });

      // Si no hay respuesta (idempotencia) limpiar estado
      if (!res) {
        try { await AsyncStorage.removeItem('study:cardsCoinAccumulator'); } catch (e) {}
        set({ 
          activeSession: null,
          currentDeck: [],
          currentCard: null,
          sessionTimer: 0,
          isTimerRunning: false,
          ankiState: {
            currentCardIndex: 0,
            isShowingAnswer: false,
            cardHistory: []
          },
          isLoading: false,
          finishingSession: false,
          cardsCoinAccumulator: 0
        });
        return;
      }

      // Si el backend devolvió rewards, actualizar el store de auth
      if (res.rewards) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { useAuthStore } = require('./authStore');
          const auth = useAuthStore.getState();
          if (auth && auth.updateUserXaviCoins) {
            const newCoins = (res.rewards && (res.rewards.newXavicoins ?? res.rewards.newXaviCoins ?? res.rewards.newXavicoins)) || undefined;
            if (typeof newCoins === 'number') auth.updateUserXaviCoins(newCoins);
          }
          if (auth && auth.refreshUserData) await auth.refreshUserData();
        } catch (e) {
          console.warn('No se pudo actualizar authStore con recompensas', e);
        }
      }

      // limpiar acumulador persistido y estado
      try { await AsyncStorage.removeItem('study:cardsCoinAccumulator'); } catch (e) {}
      set({ 
        activeSession: null,
        currentDeck: [],
        currentCard: null,
        sessionTimer: 0,
        isTimerRunning: false,
        ankiState: {
          currentCardIndex: 0,
          isShowingAnswer: false,
          cardHistory: []
        },
        // reset accumulator
        cardsCoinAccumulator: 0,
        isLoading: false,
        finishingSession: false
      });
    } catch (error) {
      // Manejar caso de duración mínima no alcanzada (400) y mostrar detalles al usuario
      const resp = (error as any)?.response;
      if (resp && resp.status === 400) {
        const details = resp.data?.details || {};
        set({ error: 'No alcanzaste el tiempo mínimo de estudio. Minutos restantes: ' + (details.remainingMinutes ?? '?'), isLoading: false, finishingSession: false });
        return;
      }

      set({ 
        error: error instanceof Error ? error.message : 'Error al finalizar sesión',
        isLoading: false,
        finishingSession: false
      });
    }
  },

  cancelSession: async () => {
    const { activeSession } = get();
    if (!activeSession) return;

    try {
      await studyService.cancelActiveSession();
      try { await AsyncStorage.removeItem('study:cardsCoinAccumulator'); } catch (e) {}
      set({ 
        activeSession: null,
        currentDeck: [],
        currentCard: null,
        sessionTimer: 0,
        isTimerRunning: false,
        ankiState: {
          currentCardIndex: 0,
          isShowingAnswer: false,
          cardHistory: []
        },
        cardsCoinAccumulator: 0
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al cancelar sesión'
      });
    }
  },

  startTimer: () => {
    const { appState } = get();
    
    // Solo iniciar timer si la app está activa
    if (appState === 'active') {
      set({ isTimerRunning: true });
    }
  },

  pauseTimer: () => {
    set({ isTimerRunning: false });
  },

  resetTimer: () => {
    set({ sessionTimer: 0, isTimerRunning: false });
  },

  updateAppState: (appState: AppState) => {
    const { isTimerRunning, activeSession } = get();
    
    set({ appState });
    
    // Si la app sale del estado activo y hay una sesión, pausar timer y cancelar sesión
    if (appState !== 'active' && isTimerRunning && activeSession) {
      get().pauseTimer();
      get().resetTimer();
      get().cancelSession();
      get().setShowInactivityAlert(true);
    }
  },

  setShowInactivityAlert: (show: boolean) => {
    set({ showInactivityAlert: show });
  },

  showAnswer: () => {
    set(state => ({
      ankiState: {
        ...state.ankiState,
        isShowingAnswer: true
      }
    }));
  },

  nextCard: (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    const { currentDeck, ankiState, currentCard } = get();
    if (!currentCard) return;

    // Al avanzar entre tarjetas, acumular 0.2 XaviCoins internamente y persistirlo
    try {
      const prev = Number(get().cardsCoinAccumulator || 0);
      const newVal = prev + 0.2;
      set({ cardsCoinAccumulator: newVal });
      AsyncStorage.setItem('study:cardsCoinAccumulator', JSON.stringify(newVal)).catch(() => {});
    } catch (e) {
      // ignore storage errors
    }

    // Registrar en historial
    const cardHistory = [...ankiState.cardHistory];
    cardHistory.push({
      cardId: currentCard.id,
      difficulty,
      timeSpent: 0
    });

    // Crear una nueva baraja donde eliminamos la instancia actual y la reinsertamos
    const deckCopy = [...currentDeck];
    const currentIndex = ankiState.currentCardIndex;

    // Remover la tarjeta actual
    const removed = deckCopy.splice(currentIndex, 1)[0];

    // Definir offset según dificultad (cómo lejos se reinsertará)
    let offset = 1; // 'again' por defecto
    if (difficulty === 'hard') offset = 2;
    if (difficulty === 'good') offset = 5;
    if (difficulty === 'easy') offset = deckCopy.length; // al final

    const insertIndex = Math.min(currentIndex + offset, deckCopy.length);
    deckCopy.splice(insertIndex, 0, removed);

    // El siguiente índice a mostrar será el mismo índice (porque removimos la actual)
    let nextIndex = currentIndex;

    // Si por alguna razón nextIndex queda fuera, lo ajustamos (wrap)
    if (nextIndex >= deckCopy.length) nextIndex = 0;

    // Si hay sesión activa y no hemos alcanzado targetDuration, dejamos el bucle (deck seguirá rotando).
    // Si no hay sesión o el tiempo objetivo fue alcanzado y el usuario llegó al final, currentCard puede ponerse en null
    const { sessionTimer, activeSession } = get();
    const minutesStudied = Math.floor((sessionTimer || 0) / 60);
    const target = (activeSession as any)?.targetDuration || 0;

    // Actualizar el store con la nueva baraja y siguiente tarjeta
    if (deckCopy.length === 0) {
      set({ currentDeck: deckCopy, currentCard: null, ankiState: { ...ankiState, currentCardIndex: 0, isShowingAnswer: false, cardHistory } });
      return;
    }

    // Actualizar baraja y avanzar al siguiente índice (siempre seguir en bucle hasta que el usuario finalice)
    set({
      currentDeck: deckCopy,
      currentCard: deckCopy[nextIndex] || null,
      ankiState: {
        currentCardIndex: nextIndex,
        isShowingAnswer: false,
        cardHistory
      }
    });
  },

  recordCardStudy: async (cardId: number, difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    const { activeSession } = get();
    
    try {
  await studyService.recordCardStudy(cardId, activeSession?.id);
    } catch (error) {
      console.error('Error al registrar estudio de tarjeta:', error);
      // No mostramos error al usuario para no interrumpir el flujo de estudio
    }
  },

  clearError: () => {
    set({ error: null });
  },

  loadProgress: async () => {
    try {
      const progress = await studyService.getStudyProgress();
      set({ progress });
    } catch (error) {
      console.error('Error al cargar progreso:', error);
    }
  },

  loadStatistics: async (timeframe = 'month') => {
    try {
      const statistics = await studyService.getStudyStatistics(timeframe);
      set({ statistics });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  }
}));

// Timer interval - se maneja fuera del store para evitar problemas de estado
let timerInterval: NodeJS.Timeout | null = null;

// Función para manejar el timer
export const startStudyTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  timerInterval = setInterval(() => {
    const { isTimerRunning, appState } = useStudyStore.getState();
    
    if (isTimerRunning && appState === 'active') {
      useStudyStore.setState(state => ({
        sessionTimer: state.sessionTimer + 1
      }));
    }
  }, 1000);
};

export const stopStudyTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};
