export type OfferStatus = 'open' | 'matched' | 'closed';
export type DemandStatus = 'open' | 'matched' | 'closed';
export type RouteStatus = 'planned' | 'in_progress' | 'done';
export type ShipmentStatus =
  | 'pending'
  | 'in_transit'
  | 'delivered'
  | 'accepted'
  | 'rejected';

/** Заявка производителя: объём молока к сдаче */
export type SupplyOffer = {
  id: string;
  shopName: string;
  units: number;
  conditionNote: string;
  scheduleNote: string;
  status: OfferStatus;
  createdAt: string;
};

/** Спрос переработчика: объём сырья к закупке */
export type DemandRequest = {
  id: string;
  networkName: string;
  units: number;
  paymentNote: string;
  status: DemandStatus;
  createdAt: string;
};

export type RouteStop = {
  pointId: string;
  pointName: string;
  plannedUnits: number;
};

export type LogisticsRoute = {
  id: string;
  title: string;
  status: RouteStatus;
  stops: RouteStop[];
  vehicleNote: string;
};

export type Shipment = {
  id: string;
  fromName: string;
  toName: string;
  units: number;
  status: ShipmentStatus;
  qualityNote: string;
  updatedAt: string;
};
