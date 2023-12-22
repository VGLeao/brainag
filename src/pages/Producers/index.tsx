import Table from 'rc-table';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Producer } from '../../models/producer';
import { ColumnsType } from 'rc-table/lib/interface';
import { ProducersContext } from '../../contexts/producers';
import ProducersForm from './ProducersForm/Form';
import { useContext } from 'react';

const Producers = () => {
  const { producersList, deleteProducer } = useContext(ProducersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const removeProducer = (row: Producer) => {
    deleteProducer(row.id);
  };

  const columns: ColumnsType<Producer> = [
    {
      title: 'Nome do produtor',
      dataIndex: 'producerName',
      key: 'producerName',
      width: 100,
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      width: 100,
    },
    {
      title: 'Nome da fazenda',
      dataIndex: 'farmName',
      key: 'farmName',
      width: 200,
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'operations',
      render: (row: Producer) => (
        <Button onClick={() => removeProducer(row)}>Delete</Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={producersList} rowKey="id" />
      <Button onClick={onOpen}>Cadastrar produtor</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={6}>
          <ProducersForm />
          <Button colorScheme="gray" onClick={onClose} mb={4}>
            Cancelar
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Producers;
