import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { PlatformRole } from './roles';

type RoleContextValue = {
  role: PlatformRole | null;
  setRole: (role: PlatformRole) => void;
  clearRole: () => void;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<PlatformRole | null>(null);

  const setRole = useCallback((next: PlatformRole) => {
    setRoleState(next);
  }, []);

  const clearRole = useCallback(() => {
    setRoleState(null);
  }, []);

  const value = useMemo(
    () => ({ role, setRole, clearRole }),
    [role, setRole, clearRole],
  );

  return (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  );
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) {
    throw new Error('useRole must be used inside RoleProvider');
  }
  return ctx;
}
