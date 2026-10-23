import type {
  DemandRequest,
  LogisticsRoute,
  Shipment,
  SupplyOffer,
} from './platformTypes';

export const MOCK_OFFERS: SupplyOffer[] = [
  {
    id: 'offer-1',
    shopName: 'Хозяйство Сулейменовых',
    units: 120,
    conditionNote: 'Охлаждённое, жирность 3.6%',
    scheduleNote: 'Сдача пн–пт до 10:00',
    status: 'open',
    createdAt: '2026-10-22T08:00:00.000Z',
  },
  {
    id: 'offer-2',
    shopName: 'Ферма «Нұр»',
    units: 80,
    conditionNote: 'Утренний надой',
    scheduleNote: 'Готово завтра утром',
    status: 'open',
    createdAt: '2026-10-22T09:30:00.000Z',
  },
  {
    id: 'offer-3',
    shopName: 'КФХ «Жетісу»',
    units: 95,
    conditionNote: 'Соответствует стандарту ЕАЭС',
    scheduleNote: 'По согласованию',
    status: 'matched',
    createdAt: '2026-10-21T14:00:00.000Z',
  },
];

export const MOCK_DEMANDS: DemandRequest[] = [
  {
    id: 'demand-1',
    networkName: 'Завод «Молочный край»',
    units: 900,
    paymentNote: 'Оплата 7 дней после приёмки',
    status: 'open',
    createdAt: '2026-10-22T07:00:00.000Z',
  },
  {
    id: 'demand-2',
    networkName: 'Переработка «Ақ сүт»',
    units: 450,
    paymentNote: 'Предоплата 30%',
    status: 'open',
    createdAt: '2026-10-22T10:15:00.000Z',
  },
  {
    id: 'demand-3',
    networkName: 'Цех «Сарыарқа»',
    units: 600,
    paymentNote: 'Оплата по факту',
    status: 'matched',
    createdAt: '2026-10-20T12:00:00.000Z',
  },
];

export const MOCK_ROUTES: LogisticsRoute[] = [
  {
    id: 'route-1',
    title: 'Северный круг',
    status: 'planned',
    vehicleNote: 'Рефрижератор · до 2000 л',
    stops: [
      {
        pointId: 'farm-1',
        pointName: 'Хозяйство Сулейменовых',
        plannedUnits: 120,
      },
      { pointId: 'farm-5', pointName: 'КФХ «Жетісу»', plannedUnits: 95 },
      {
        pointId: 'farm-10',
        pointName: 'ТОО «Молочный край»',
        plannedUnits: 600,
      },
    ],
  },
  {
    id: 'route-2',
    title: 'Восточный сбор',
    status: 'in_progress',
    vehicleNote: 'Цистерна · до 1500 л',
    stops: [
      { pointId: 'farm-3', pointName: 'Ферма «Нұр»', plannedUnits: 80 },
      { pointId: 'farm-4', pointName: 'Точка приёма №2', plannedUnits: 900 },
    ],
  },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-1',
    fromName: 'Хозяйство Сулейменовых',
    toName: 'Завод «Молочный край»',
    units: 120,
    status: 'in_transit',
    qualityNote: 'Контроль температуры в пути',
    updatedAt: '2026-10-22T11:00:00.000Z',
  },
  {
    id: 'ship-2',
    fromName: 'Точка приёма №5',
    toName: 'Переработка «Ақ сүт»',
    units: 550,
    status: 'delivered',
    qualityNote: 'Проба на доп. анализ',
    updatedAt: '2026-10-22T09:40:00.000Z',
  },
  {
    id: 'ship-3',
    fromName: 'Ферма «Сарыарқа»',
    toName: 'Цех «Сарыарқа»',
    units: 300,
    status: 'accepted',
    qualityNote: 'Принято без замечаний',
    updatedAt: '2026-10-21T16:20:00.000Z',
  },
];
