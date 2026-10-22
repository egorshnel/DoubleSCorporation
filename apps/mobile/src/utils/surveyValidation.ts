export type VolumeParseResult =
  | { ok: true; liters: number }
  | { ok: false; error: string };

export function parseVolumeLiters(raw: string): VolumeParseResult {
  const trimmed = raw.trim().replace(',', '.');
  if (!trimmed) {
    return { ok: false, error: 'Укажите количество устройств' };
  }
  const liters = Number(trimmed);
  if (!Number.isFinite(liters)) {
    return { ok: false, error: 'Объём должен быть числом' };
  }
  if (liters <= 0) {
    return { ok: false, error: 'Объём должен быть больше 0' };
  }
  if (liters > 100_000) {
    return { ok: false, error: 'Слишком большое значение' };
  }
  return { ok: true, liters };
}
