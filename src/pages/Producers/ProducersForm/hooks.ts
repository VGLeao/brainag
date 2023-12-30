import { useQuery } from 'react-query';
import { getCitiesByState, getStates } from '../../../services/geolocation';
import { useState } from 'react';
import { SelectOption } from '../../../types/selectOption';

export const useGetStates = () => {
  const [statesOptions, setStatesOptions] = useState<SelectOption<string>[]>(
    []
  );
  const query = useQuery('states', getStates, {
    onSuccess: (res) => {
      const options: SelectOption<string>[] = [];
      res.data.forEach((state) => {
        options.push({ label: state.sigla, value: state.sigla });
      });
      setStatesOptions(options);
    },
  });

  return { ...query, statesOptions };
};

export const useGetCities = (stateAcronym: string) => {
  const [citiesOptions, setCitiesOptions] = useState<SelectOption<string>[]>(
    []
  );
  const query = useQuery(
    ['cities', stateAcronym],
    () => getCitiesByState(stateAcronym),
    {
      onSuccess: (res) => {
        const options: SelectOption<string>[] = [];
        res.data.forEach((city) => {
          options.push({ label: city.nome, value: city.nome });
        });
        setCitiesOptions(options);
      },
      enabled: !!stateAcronym,
    }
  );

  return { ...query, citiesOptions };
};
