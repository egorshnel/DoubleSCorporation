import type { Farm } from './types';

export type FarmFilter = 'all' | 'producers' | 'collectors' | 'small';

export function filterFarms(
  farms: Farm[],
  query: string,
  filter: FarmFilter,
): Farm[] {
  const q = query.trim().toLowerCase();

  return farms.filter((farm) => {
    if (filter === 'producers' && farm.type !== 'producer') {
      return false;
    }
    if (filter === 'collectors' && farm.type !== 'collector') {
      return false;
    }
    if (
      filter === 'small' &&
      !(farm.type === 'producer' && farm.cowCount > 0 && farm.cowCount < 5)
    ) {
      return false;
    }
    if (!q) {
      return true;
    }
    return (
      farm.name.toLowerCase().includes(q) ||
      farm.contactName.toLowerCase().includes(q) ||
      farm.contactPhone.toLowerCase().includes(q)
    );
  });
}
