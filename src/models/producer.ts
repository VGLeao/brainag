import { Cultivation } from './cultivation';

export type Producer = {
  id: string;
  documentNumber: string;
  producerName: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cultivations: Cultivation[];
};
