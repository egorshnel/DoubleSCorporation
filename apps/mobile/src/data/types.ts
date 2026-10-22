export type FarmType = 'producer' | 'collector';

export type Farm = {
  id: string;
  type: FarmType;
  name: string;
  lat: number;
  lng: number;
  volumeLitersTypical: number;
  seasonalityNote: string;
  growthPotentialNote: string;
  cowCount: number;
  contactName: string;
  contactPhone: string;
};

export const FARM_TYPE_LABEL: Record<FarmType, string> = {
  producer: 'Производитель',
  collector: 'Приёмщик',
};

export type Survey = {
  id: string;
  farmId: string;
  farmName: string;
  collectedAt: string;
  volumeLiters: number;
  qualityNote: string;
  lat: number;
  lng: number;
};
