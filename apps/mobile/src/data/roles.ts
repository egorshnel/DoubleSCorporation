export type PlatformRole = 'producer' | 'wholesaler' | 'processor';

export const ROLE_LABEL: Record<PlatformRole, string> = {
  producer: 'Производитель',
  wholesaler: 'Оптовик',
  processor: 'Переработчик',
};

export const ROLE_SUBTITLE: Record<PlatformRole, string> = {
  producer: 'Сдаёте сырое молоко на платформу',
  wholesaler: 'Закупаете молоко у хозяйств и продаёте переработчикам',
  processor: 'Закупаете сырьё для переработки',
};
