import { PropsWithChildren, createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Producer } from '../models/producer';
import { producers } from '../data/producers';

type ProducersContextProps = {
  producersList: Producer[];
  createProducer: (producer: Omit<Producer, 'id'>) => void;
  updateProducer: (id: string, producer: Omit<Producer, 'id'>) => void;
  deleteProducer: (id: string) => void;
};

const ProducersContext = createContext<ProducersContextProps>(
  {} as ProducersContextProps
);

const ProducersContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [producersList, setProducersList] = useState<Producer[]>(producers);

  const createProducer = (producer: Omit<Producer, 'id'>) => {
    const payload = { id: uuidv4(), ...producer };
    setProducersList((prev) => [...prev, payload]);
  };

  const updateProducer = (id: string, producer: Omit<Producer, 'id'>) => {
    const producerFoundIndex = findOneOrFail(id);
    const auxList = [...producersList];

    auxList[producerFoundIndex] = {
      id: id,
      producerName: producer.producerName,
      documentNumber: producer.documentNumber,
      arableArea: producer.arableArea,
      city: producer.city,
      cultivations: producer.cultivations,
      farmName: producer.farmName,
      state: producer.state,
      totalArea: producer.totalArea,
      vegetationArea: producer.vegetationArea,
    };

    setProducersList(auxList);
  };

  const deleteProducer = (id: string) => {
    const producerToDeleteIndex = findOneOrFail(id);
    const auxList = [...producersList];
    auxList.splice(producerToDeleteIndex, 1);
    setProducersList(auxList);
  };

  const findOneOrFail = (id: string) => {
    const producerFoundIndex = producersList.findIndex((p) => p.id === id);
    if (producerFoundIndex === -1) {
      throw new Error('Produtor não encontrado');
    }

    return producerFoundIndex;
  };

  return (
    <ProducersContext.Provider
      value={{ producersList, createProducer, updateProducer, deleteProducer }}
    >
      {children}
    </ProducersContext.Provider>
  );
};

export { ProducersContextProvider, ProducersContext };
