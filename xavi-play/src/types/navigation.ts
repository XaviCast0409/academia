export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  ActivityDetails: { activityId: number };
  Evidences: undefined;
  Transactions: undefined;
  Ranking: undefined;
  Missions: undefined;
  Achievements: undefined;
  CreateUser: undefined;
  Register: undefined;
  LoginAfterRegister: { userEmail?: string };
};

export type TabParamList = {
  Store: undefined;
  Activities: undefined;
  Profile: undefined;
}; 