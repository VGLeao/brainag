import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { default as MultiSelect } from 'react-select';
import { ProducerFormSchema, ProducerSchema } from './schema';
import { cultivations } from '@/data/cultivations';
import { ChangeEvent, useContext, useEffect } from 'react';
import { mask } from '@/utils/masks';
import { ProducersContext } from '@/contexts/producers';
import { useGetCities, useGetStates } from './hooks';
import { Producer } from '@/models/producer';
import { Cultivation } from '@/models/cultivation';
import { toast } from 'react-toastify';

type ProducersFormProps = {
  initialValues?: Producer;
  handleCloseModal: () => void;
};

const ProducersForm: React.FC<ProducersFormProps> = ({
  initialValues,
  handleCloseModal,
}) => {
  const { createProducer, updateProducer } = useContext(ProducersContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProducerSchema>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(ProducerFormSchema),
    defaultValues: {
      documentNumber: initialValues?.documentNumber,
      farmName: initialValues?.farmName,
      producerName: initialValues?.producerName,
      arableArea: initialValues?.arableArea.toString() as unknown as number,
      totalArea: initialValues?.totalArea.toString() as unknown as number,
      vegetationArea:
        initialValues?.vegetationArea.toString() as unknown as number,
      cultivations: initialValues?.cultivations.map((cultivation) => {
        return {
          value: cultivation,
          label: cultivation,
        };
      }),
    },
  });
  const { data: states, isFetched: isStatesFetched } = useGetStates();
  const { data: cities, isFetched: isCitiesFetched } = useGetCities(
    watch('state')
  );
  const options = cultivations.map((cultivation) => {
    return { value: cultivation, label: cultivation };
  });

  useEffect(() => {
    if (initialValues && isStatesFetched) {
      setValue('state', initialValues.state);
    }
  }, [initialValues, setValue, isStatesFetched]);

  useEffect(() => {
    if (initialValues && isCitiesFetched) {
      setValue('city', initialValues.city);
    }
  }, [initialValues, setValue, isCitiesFetched]);

  const onSubmit: SubmitHandler<ProducerSchema> = (values) => {
    const payload: Omit<Producer, 'id'> = {
      documentNumber: values.documentNumber,
      farmName: values.farmName,
      producerName: values.producerName,
      arableArea: values.arableArea,
      totalArea: values.totalArea,
      vegetationArea: values.vegetationArea,
      cultivations: values.cultivations.map(
        (cultivation) => cultivation.value
      ) as Cultivation[],
      state: values.state,
      city: values.city,
    };
    if (!initialValues) {
      try {
        createProducer(payload);
        toast.success('Produtor criado com sucesso');
        handleCloseModal();
      } catch {
        toast.error('Ops! Algo deu errado.');
      }
    } else {
      try {
        updateProducer(initialValues.id, payload);
        toast.success('Produtor editado com sucesso');
        handleCloseModal();
      } catch {
        toast.error('Ops! Algo deu errado.');
      }
    }
  };

  const handleMaskingDocumentNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 14) {
      setValue('documentNumber', mask('cnpj', e.target.value));
    } else {
      setValue('documentNumber', mask('cpf', e.target.value));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>CPF ou CNPJ</FormLabel>
        <Input
          {...register('documentNumber')}
          placeholder=" "
          isInvalid={!!errors?.documentNumber}
          onChange={handleMaskingDocumentNumber}
        />
        <Text fontSize="small" color="red.600">
          {errors?.documentNumber?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Nome do produtor</FormLabel>
        <Input
          {...register('producerName')}
          placeholder=" "
          isInvalid={!!errors?.producerName}
        />
        <Text fontSize="small" color="red.600">
          {errors?.producerName?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Nome da fazenda</FormLabel>
        <Input
          {...register('farmName')}
          placeholder=""
          isInvalid={!!errors?.producerName}
        />
        <Text fontSize="small" color="red.600">
          {errors?.producerName?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Estado</FormLabel>
        <Select
          {...register('state')}
          placeholder=" "
          isInvalid={!!errors?.state}
        >
          {states?.data.map((state) => {
            return (
              <option value={state.sigla} key={state.id}>
                {state.sigla}
              </option>
            );
          })}
        </Select>
        <Text fontSize="small" color="red.600">
          {errors?.state?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Cidade</FormLabel>
        <Select
          {...register('city')}
          placeholder=" "
          isInvalid={!!errors?.city}
        >
          {cities?.data.map((city) => {
            return (
              <option value={city.nome} key={city.id}>
                {city.nome}
              </option>
            );
          })}
        </Select>
        <Text fontSize="small" color="red.600">
          {errors?.city?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Área total da fazenda</FormLabel>
        <Input
          {...register('totalArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.totalArea}
        />
        <Text fontSize="small" color="red.600">
          {errors?.totalArea?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Área agricultável</FormLabel>
        <Input
          {...register('arableArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.arableArea}
        />
        <Text fontSize="small" color="red.600">
          {errors?.arableArea?.message}
        </Text>
      </FormControl>

      <FormControl>
        <FormLabel>Área de vegetação</FormLabel>
        <Input
          {...register('vegetationArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.vegetationArea}
        />
        <Text fontSize="small" color="red.600">
          {errors?.vegetationArea?.message}
        </Text>
      </FormControl>

      <Controller
        name="cultivations"
        control={control}
        render={({ field }) => (
          <>
            <FormLabel>Culturas</FormLabel>
            <MultiSelect
              placeholder="Selecione as culturas"
              isMulti
              {...field}
              options={options}
              closeMenuOnSelect={false}
            />
          </>
        )}
      />
      <Button colorScheme="purple" width="100%" mt={6} mb={4} type="submit">
        Salvar
      </Button>
    </form>
  );
};

export default ProducersForm;
