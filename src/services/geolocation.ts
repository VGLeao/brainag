import { CityResponseDto } from '../models/dto/cityResponseDto';
import { StateResponseDto } from '../models/dto/stateResponseDto';
import api from './api';

export const getStates = async () => {
  return await api.get<StateResponseDto[]>(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'
  );
};

export const getCitiesByState = async (stateAcronym: string) => {
  return await api.get<CityResponseDto[]>(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateAcronym}/distritos`
  );
};
