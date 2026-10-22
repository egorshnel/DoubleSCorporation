export type FarmsStackParamList = {
  FarmsHome: undefined;
  FarmDetail: { farmId: string };
};

export type CollectTabParamList = {
  Farms: undefined;
  Surveys: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  SurveyForm: { farmId: string; surveyId?: string };
};
