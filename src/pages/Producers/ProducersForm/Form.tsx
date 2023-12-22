import { Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { ProducerFormSchema, ProducerSchema } from './schema';
import { cultivations } from '../../../data/cultivations';
import { ChangeEvent, useContext } from 'react';
import { mask } from '../../../utils/masks';
import { ProducersContext } from '../../../contexts/producers';

const ProducersForm = () => {
  const { createProducer } = useContext(ProducersContext);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProducerSchema>({
    criteriaMode: 'all',
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(ProducerFormSchema),
  });

  const options = cultivations.map((cultivation) => {
    return { value: cultivation, label: cultivation };
  });

  console.log(errors);

  const onSubmit: SubmitHandler<ProducerSchema> = (values) => {
    console.log(errors);
    console.log(values);
    createProducer(values);
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
      <FormControl variant="floating">
        <Input
          {...register('documentNumber')}
          placeholder=" "
          isInvalid={!!errors?.documentNumber}
          onChange={handleMaskingDocumentNumber}
        />
        <FormLabel>CPF ou CNPJ</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.documentNumber?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('producerName')}
          placeholder=" "
          isInvalid={!!errors?.producerName}
        />
        <FormLabel>Nome do produtor</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.producerName?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('farmName')}
          placeholder=" "
          isInvalid={!!errors?.producerName}
        />
        <FormLabel>Nome da fazenda</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.producerName?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('city')}
          placeholder=" "
          isInvalid={!!errors?.city}
        />
        <FormLabel>Cidade</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.city?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('state')}
          placeholder=" "
          isInvalid={!!errors?.state}
        />
        <FormLabel>Estado</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.state?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('totalArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.totalArea}
        />
        <FormLabel>Área total da fazenda</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.totalArea?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('arableArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.arableArea}
        />
        <FormLabel>Área agricultável</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.arableArea?.message}
        </Text>
      </FormControl>
      <FormControl variant="floating">
        <Input
          {...register('vegetationArea')}
          placeholder=" "
          type="number"
          isInvalid={!!errors?.vegetationArea}
        />
        <FormLabel>Área de vegetação</FormLabel>
        <Text fontSize="small" color="red.600">
          {errors?.vegetationArea?.message}
        </Text>
      </FormControl>
      <Controller
        name="cultivations"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Selecione as culturas"
            isMulti
            {...field}
            options={options}
            closeMenuOnSelect={false}
          />
        )}
      />
      <Button colorScheme="purple" width="100%" mt={6} mb={4} type="submit">
        Salvar
      </Button>
    </form>
  );
};

export default ProducersForm;
