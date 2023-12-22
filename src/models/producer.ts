import { Cultivation } from './cultivation';
import { State } from './state';

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
  cultivations: string[];
};
