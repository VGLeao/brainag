import Table from 'rc-table';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Producer } from '@/models/producer';
import { ColumnsType } from 'rc-table/lib/interface';
import { ProducersContext } from '@/contexts/producers';
import ProducersForm from './ProducersForm/Form';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

const Producers = () => {
  const { producersList, deleteProducer } = useContext(ProducersContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProducer, setSelectedProducer] = useState<Producer>();

  const removeProducer = (row: Producer) => {
    try {
      deleteProducer(row.id);
      toast.success('Produtor excluído com sucesso');
    } catch {
      toast.error('Ops! Algo deu errado.');
    }
  };

  const handleEdit = (row: Producer) => {
    setSelectedProducer(row);
    onOpen();
  };

  const handleCloseModal = () => {
    setSelectedProducer(undefined), onClose();
  };

  const modalTitle = selectedProducer
    ? 'Editar produtor'
    : 'Cadastrar produtor';

  const columns: ColumnsType<Producer> = [
    {
      title: 'Nome do produtor',
      dataIndex: 'producerName',
      key: 'producerName',
      width: 200,
      align: 'center',
    },
    {
      title: 'CPF/CNPJ',
      dataIndex: 'documentNumber',
      key: 'documentNumber',
      width: 200,
      align: 'center',
    },
    {
      title: 'Nome da fazenda',
      dataIndex: 'farmName',
      key: 'farmName',
      width: 200,
      align: 'center',
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      align: 'center',
    },
    {
      title: 'Cidade',
      dataIndex: 'city',
      key: 'city',
      width: 100,
      align: 'center',
    },
    {
      title: 'Área agricultável',
      dataIndex: 'arableArea',
      key: 'arableArea',
      width: 100,
      align: 'center',
    },
    {
      title: 'Área de vegetação',
      dataIndex: 'vegetationArea',
      key: 'vegetationArea',
      width: 100,
      align: 'center',
    },
    {
      title: 'Área total',
      dataIndex: 'totalArea',
      key: 'totalArea',
      width: 100,
      align: 'center',
    },
    {
      title: 'Ações',
      dataIndex: '',
      key: 'actions',
      render: (row: Producer) => (
        <Flex gap={3} fontSize={24} color="primary.500">
          <IconButton
            icon={<FaRegEdit />}
            onClick={() => handleEdit(row)}
            aria-label="edit-producer"
            colorScheme="purple"
          />
          <IconButton
            icon={<RiDeleteBin6Line />}
            onClick={() => removeProducer(row)}
            aria-label="delete-producer"
            colorScheme="purple"
          />
        </Flex>
      ),
    },
  ];

  return (
    <>
      <Button onClick={onOpen} colorScheme="purple">
        Cadastrar produtor
      </Button>
      <Box marginTop={8}>
        <Table columns={columns} data={producersList} rowKey="id" />
      </Box>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent px={6}>
          <Text fontWeight={700} fontSize={18} textAlign="center" marginY={4}>
            {modalTitle}
          </Text>
          <ProducersForm
            initialValues={selectedProducer}
            handleCloseModal={handleCloseModal}
          />
          <Button colorScheme="gray" onClick={handleCloseModal} mb={4}>
            Cancelar
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Producers;
