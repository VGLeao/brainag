import { Producer } from '../models/producer';
import { v4 as uuidv4 } from 'uuid';

export const producers: Producer[] = [
  {
    id: uuidv4(),
    documentNumber: '882.247.570-48',
    producerName: 'João',
    farmName: 'Fazenda do João',
    city: 'Maceió',
    state: {
      id: 1,
      acronym: 'AL',
      name: 'Alagoas',
    },
    totalArea: 10,
    arableArea: 8,
    vegetationArea: 2, //
    cultivations: ['café', 'cana de açúcar'],
  },
  {
    id: uuidv4(),
    documentNumber: '882.247.570-48',
    producerName: 'João',
    farmName: 'Fazenda do João',
    city: 'Maceió',
    state: {
      id: 1,
      acronym: 'AL',
      name: 'Alagoas',
    },
    totalArea: 10,
    arableArea: 8,
    vegetationArea: 2,
    cultivations: ['café'],
  },
  {
    id: uuidv4(),
    documentNumber: '882.247.570-48',
    producerName: 'Maria',
    farmName: 'Fazenda da Maria',
    city: 'Recife',
    state: {
      id: 17,
      acronym: 'PE',
      name: 'Pernambuco',
    },
    totalArea: 14,
    arableArea: 9,
    vegetationArea: 5, //
    cultivations: ['milho', 'algodão', 'café'],
  },
];
