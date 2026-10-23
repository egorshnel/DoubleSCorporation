import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Survey } from './types';

type NewSurveyInput = Omit<Survey, 'id' | 'collectedAt'>;

type UpdateSurveyInput = {
  volumeLiters: number;
  qualityNote: string;
  lat: number;
  lng: number;
};

type CollectContextValue = {
  surveys: Survey[];
  addSurvey: (input: NewSurveyInput) => Survey;
  updateSurvey: (id: string, input: UpdateSurveyInput) => Survey | undefined;
  deleteSurvey: (id: string) => void;
  getSurveyById: (id: string) => Survey | undefined;
};

const CollectContext = createContext<CollectContextValue | null>(null);

function createInitialSurveys(): Survey[] {
  return [
    {
      id: 'survey-seed-1',
      farmId: 'farm-2',
      farmName: 'Кооператив «Ақ сүт»',
      collectedAt: new Date().toISOString(),
      volumeLiters: 420,
      qualityNote: 'Температура в норме',
      lat: 49.845,
      lng: 73.142,
    },
  ];
}

export function CollectProvider({ children }: { children: ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>(createInitialSurveys);

  const addSurvey = useCallback((input: NewSurveyInput) => {
    const survey: Survey = {
      ...input,
      id: `survey-${Date.now()}`,
      collectedAt: new Date().toISOString(),
    };
    setSurveys((prev) => [survey, ...prev]);
    return survey;
  }, []);

  const updateSurvey = useCallback((id: string, input: UpdateSurveyInput) => {
    let updated: Survey | undefined;
    setSurveys((prev) =>
      prev.map((survey) => {
        if (survey.id !== id) {
          return survey;
        }
        updated = { ...survey, ...input };
        return updated;
      }),
    );
    return updated;
  }, []);

  const deleteSurvey = useCallback((id: string) => {
    setSurveys((prev) => prev.filter((survey) => survey.id !== id));
  }, []);

  const getSurveyById = useCallback(
    (id: string) => surveys.find((survey) => survey.id === id),
    [surveys],
  );

  const value = useMemo(
    () => ({
      surveys,
      addSurvey,
      updateSurvey,
      deleteSurvey,
      getSurveyById,
    }),
    [surveys, addSurvey, updateSurvey, deleteSurvey, getSurveyById],
  );

  return (
    <CollectContext.Provider value={value}>{children}</CollectContext.Provider>
  );
}

export function useCollect() {
  const ctx = useContext(CollectContext);
  if (!ctx) {
    throw new Error('useCollect must be used inside CollectProvider');
  }
  return ctx;
}
