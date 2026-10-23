export type FarmsStackParamList = {
  FarmsHome: undefined;
  FarmDetail: { farmId: string; title: string };
};

export type WholesalerTabParamList = {
  Points: undefined;
  Visits: undefined;
  Deals: undefined;
  Routes: undefined;
  Cabinet: undefined;
};

export type ProducerTabParamList = {
  Deals: undefined;
  Monitor: undefined;
  Cabinet: undefined;
};

export type ProcessorTabParamList = {
  Deals: undefined;
  Monitor: undefined;
  Cabinet: undefined;
};

export type RootStackParamList = {
  RoleSelect: undefined;
  Main: undefined;
  SurveyForm: { farmId: string; surveyId?: string };
};
