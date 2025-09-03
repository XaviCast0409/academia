export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  ActivityDetails: { activityId: number };
  Evidences: undefined;
  Transactions: undefined;
  Ranking: undefined;
  Missions: undefined;
  Achievements: undefined;
  Notifications: undefined;
  CreateUser: undefined;
  Register: undefined;
  LoginAfterRegister: { userEmail?: string };
  // Study system routes
  StudyDecks: undefined;
  StudySession: {
    deckCategory: string;
    deckMathTopic?: string;
    sessionGoal: number;
  };
  StudyResults: {
    sessionId: number;
    rewards: {
      xavicoins: number;
      timeBonus: boolean;
      cardsBonus: number;
    };
    statistics: {
      cardsStudied: number;
      timeSpent: number;
      correctAnswers: number;
    };
  };
};

export type TabParamList = {
  Store: undefined;
  Activities: undefined;
  Profile: undefined;
  Study: undefined;
}; 