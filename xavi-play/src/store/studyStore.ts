import { create } from 'zustand';
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
      const { useAuthStore } = await import('./authStore');
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
      
      const session = await studyService.startStudySession({
        sessionType: 'general',
        sessionGoal: sessionGoal
      });
      
      // Cargar las tarjetas del mazo
      await get().loadDeckCards(deckCategory, deckMathTopic);
      
      set({ 
        activeSession: session,
        sessionTimer: 0,
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
        const { debugAuthState } = await import('@/utils/authDebug');
        await debugAuthState();
      }
      
      set({ 
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        isLoading: false 
      });
      throw error;
    }
  },

  finishStudySession: async (cardsStudied: number) => {
    const { activeSession } = get();
    if (!activeSession) return;

    try {
      set({ isLoading: true, error: null });
      
      await studyService.finishStudySession(activeSession.id, {
        cardsStudied
      });
      
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
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al finalizar sesión',
        isLoading: false 
      });
    }
  },

  cancelSession: async () => {
    const { activeSession } = get();
    if (!activeSession) return;

    try {
      await studyService.cancelActiveSession();
      
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
        }
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

    // Registrar en historial
    const cardHistory = [...ankiState.cardHistory];
    cardHistory.push({
      cardId: currentCard.id,
      difficulty,
      timeSpent: 0 // Se podría implementar tracking de tiempo por tarjeta
    });

    let nextIndex = ankiState.currentCardIndex + 1;
    
    // Si la respuesta fue "again", reinsertar la tarjeta más adelante
    if (difficulty === 'again') {
      const reinsertIndex = Math.min(
        ankiState.currentCardIndex + Math.floor(Math.random() * 3) + 2,
        currentDeck.length - 1
      );
      
      // Crear nueva baraja con la tarjeta reinsertada
      const newDeck = [...currentDeck];
      newDeck.splice(reinsertIndex, 0, currentCard);
      
      set({ currentDeck: newDeck });
    }

    // Avanzar a la siguiente tarjeta
    if (nextIndex >= currentDeck.length) {
      // Fin del mazo
      set({
        currentCard: null,
        ankiState: {
          ...ankiState,
          currentCardIndex: nextIndex,
          isShowingAnswer: false,
          cardHistory
        }
      });
    } else {
      set({
        currentCard: currentDeck[nextIndex],
        ankiState: {
          currentCardIndex: nextIndex,
          isShowingAnswer: false,
          cardHistory
        }
      });
    }
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
