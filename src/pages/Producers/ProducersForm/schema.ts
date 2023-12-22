import { z } from 'zod';
import { validateCNPJ, validateCpf } from '../../../utils/validators';

export const ProducerFormSchema = z
  .object({
    documentNumber: z
      .string()
      .trim()
      .min(14, 'CPF ou CNPJ inválido')
      .refine((value) => {
        return validateCpf(value) || validateCNPJ(value);
      }, 'CPF ou CNPJ inválido'),
    producerName: z.string().trim().min(1, 'Campo obrigatório'),
    farmName: z.string().trim().min(1, 'Campo obrigatório'),
    state: z.string().min(1, 'Campo obrigatório'),
    city: z.string().trim().min(1, 'Campo obrigatório'),
    totalArea: z
      .string()
      .min(1, 'Campo obrigatório')
      .pipe(z.coerce.number().nonnegative('A área não pode ser negativa')),
    arableArea: z
      .string()
      .min(1, 'Campo obrigatório')
      .pipe(z.coerce.number().nonnegative('A área não pode ser negativa')),
    vegetationArea: z
      .string()
      .min(1, 'Campo obrigatório')
      .pipe(z.coerce.number().nonnegative('A área não pode ser negativa')),
    cultivations: z.any(),
  })
  .refine((schema) => {
    return schema.totalArea >= schema.vegetationArea + schema.arableArea;
  }, 'A área total não pode ser menor que a soma das áreas agricultável e de vegetação');

export type ProducerSchema = z.infer<typeof ProducerFormSchema>;
