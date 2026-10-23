import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  MOCK_DEMANDS,
  MOCK_OFFERS,
  MOCK_ROUTES,
  MOCK_SHIPMENTS,
} from './mockPlatform';
import type {
  DemandRequest,
  LogisticsRoute,
  Shipment,
  SupplyOffer,
} from './platformTypes';

type PlatformContextValue = {
  offers: SupplyOffer[];
  demands: DemandRequest[];
  routes: LogisticsRoute[];
  shipments: Shipment[];
  addOffer: (input: Omit<SupplyOffer, 'id' | 'createdAt' | 'status'>) => void;
  addDemand: (input: Omit<DemandRequest, 'id' | 'createdAt' | 'status'>) => void;
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [offers, setOffers] = useState<SupplyOffer[]>(MOCK_OFFERS);
  const [demands, setDemands] = useState<DemandRequest[]>(MOCK_DEMANDS);
  const [routes] = useState<LogisticsRoute[]>(MOCK_ROUTES);
  const [shipments] = useState<Shipment[]>(MOCK_SHIPMENTS);

  const addOffer = useCallback(
    (input: Omit<SupplyOffer, 'id' | 'createdAt' | 'status'>) => {
      setOffers((prev) => [
        {
          ...input,
          id: `offer-${Date.now()}`,
          status: 'open',
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [],
  );

  const addDemand = useCallback(
    (input: Omit<DemandRequest, 'id' | 'createdAt' | 'status'>) => {
      setDemands((prev) => [
        {
          ...input,
          id: `demand-${Date.now()}`,
          status: 'open',
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [],
  );

  const value = useMemo(
    () => ({
      offers,
      demands,
      routes,
      shipments,
      addOffer,
      addDemand,
    }),
    [offers, demands, routes, shipments, addOffer, addDemand],
  );

  return (
    <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
  );
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error('usePlatform must be used inside PlatformProvider');
  }
  return ctx;
}
