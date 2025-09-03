export interface StudyCard {
  id: number;
  title: string;
  question: string;
  answer: string;
  category: "matematicas" | "fisica" | "quimica" | "otros";
  mathTopic?: "algebra" | "trigonometria" | "geometria" | "aritmetica" | "razonamiento_matematico";
  subtopic?: string; // Tema específico (ej: "teoria_exponentes", "productos_notables", "angulos_trigonometricos")
  difficulty: "basico" | "intermedio" | "avanzado" | "experto";
  tags: string[];
  hasLatex: boolean;
  xavicoinsReward: number;
  isActive: boolean;
  createdById?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStudyCard {
  id: number;
  userId: number;
  studyCardId: number;
  isFavorite: boolean;
  timesStudied: number;
  lastStudied?: string;
  difficultyRating?: number;
  personalNotes?: string;
  masteryLevel: "nuevo" | "aprendiendo" | "revisando" | "dominado";
  nextReviewDate?: string;
  createdAt?: string;
  updatedAt?: string;
  studyCard?: StudyCard;
}

export interface StudySession {
  id: number;
  userId: number;
  studyCardId?: number;
  sessionType: "individual" | "review" | "quiz" | "general";
  startTime: string;
  endTime?: string;
  duration: number;
  cardsStudied: number;
  xavicoinsEarned: number;
  isCompleted: boolean;
  sessionGoal?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudyDeck {
  category: string;
  mathTopic?: string;
  displayName: string;
  cardCount: number;
  avgDifficulty: "basico" | "intermedio" | "avanzado" | "experto";
  totalXavicoins: number;
  description: string;
  icon: string;
  color: string;
}

export interface StudySessionConfig {
  deckCategory: string;
  deckMathTopic?: string;
  sessionGoal: number; // minutos
  estimatedCards: number;
  estimatedXavicoins: number;
}

export interface StudyProgress {
  totalCards: number;
  studiedCards: number;
  favoriteCards: number;
  masteredCards: number;
  progressPercentage: number;
}

export interface StudyStatistics {
  timeframe: "week" | "month" | "year";
  totalSessions: number;
  totalStudyTime: number;
  totalCardsStudied: number;
  totalXavicoinsEarned: number;
  averageSessionDuration: number;
  currentStreak: number;
  dailyAverage: number;
}

export interface AnkiCardState {
  currentCardIndex: number;
  isShowingAnswer: boolean;
  cardHistory: {
    cardId: number;
    difficulty: "again" | "hard" | "good" | "easy";
    timeSpent: number;
  }[];
}

export interface StudySessionRewards {
  xavicoins: number;
  timeBonus: boolean;
  cardsBonus: number;
  streakBonus?: number;
}

// Navegación types
export interface StudyNavigationParams {
  StudyDecks: undefined;
  StudySession: {
    deckCategory: string;
    deckMathTopic?: string;
    sessionGoal: number;
  };
  StudyCard: {
    sessionId: number;
    cards: StudyCard[];
    sessionGoal: number;
  };
  StudyResults: {
    sessionId: number;
    rewards: StudySessionRewards;
    statistics: {
      cardsStudied: number;
      timeSpent: number;
      correctAnswers: number;
    };
  };
}

// Estados de la aplicación para control de timer
export type AppState = 'active' | 'background' | 'inactive';

// Configuraciones de tiempo de estudio
export const STUDY_TIME_OPTIONS = [
  { minutes: 10, xavicoins: 15, label: "10 min" },
  { minutes: 15, xavicoins: 25, label: "15 min" },
  { minutes: 20, xavicoins: 35, label: "20 min" },
  { minutes: 30, xavicoins: 50, label: "30 min" },
  { minutes: 45, xavicoins: 75, label: "45 min" },
  { minutes: 60, xavicoins: 100, label: "1 hora" },
] as const;

// Configuraciones Anki
export const ANKI_BUTTONS = [
  { key: "again", label: "Otra vez", color: "#ef4444", difficulty: 1 },
  { key: "hard", label: "Difícil", color: "#f59e0b", difficulty: 2 },
  { key: "good", label: "Bien", color: "#10b981", difficulty: 3 },
  { key: "easy", label: "Fácil", color: "#3b82f6", difficulty: 4 },
] as const;

export type AnkiButtonType = typeof ANKI_BUTTONS[number]["key"];
