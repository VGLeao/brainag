import Chart from 'react-apexcharts';
import DataCard from '../DataCard';
import { ProducersContext } from '../../contexts/producers';
import { useContext } from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Dashboard = () => {
  const { producersList } = useContext(ProducersContext);
  const farmsQuantity = producersList.length ?? 0;
  const totalArea = producersList.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalArea,
    0
  );

  const perState: Record<string, number> = {};
  const perCultivation: Record<string, number> = {};
  const perArea = {
    'Área agricultável': 0,
    'Área de vegetação': 0,
  };

  producersList.forEach((producer) => {
    perState[producer.state.uf] = (perState[producer.state.uf] || 0) + 1;
    perArea['Área agricultável'] += producer.arableArea;
    perArea['Área de vegetação'] += producer.vegetationArea;
    producer.cultivations.forEach((cultivation) => {
      perCultivation[cultivation] = (perCultivation[cultivation] || 0) + 1;
    });
  });

  const perStateOptions = {
    labels: Object.keys(perState),
    legend: { width: 150 },
  };
  const perStateSeries = Object.values(perState);

  const perCultivationOptions = {
    labels: Object.keys(perCultivation),
    legend: { width: 150 },
  };
  const perCultivationSeries = Object.values(perCultivation);

  const perAreaOptions = {
    labels: Object.keys(perArea),
    legend: { width: 150 },
  };
  const perAreaSeries = Object.values(perArea);

  return (
    <Box>
      <Flex gap={6} justifyContent="center" marginBottom={16}>
        <DataCard title="Total de fazendas" value={farmsQuantity} />
        <DataCard title="Área total" value={totalArea} unit="hectares" />
      </Flex>
      <Flex wrap="wrap">
        <Chart
          options={perStateOptions}
          series={perStateSeries}
          type="pie"
          width="500"
        />
        <Chart
          options={perCultivationOptions}
          series={perCultivationSeries}
          type="pie"
          width="500"
        />
        <Chart
          options={perAreaOptions}
          series={perAreaSeries}
          type="pie"
          width="500"
        />
      </Flex>
    </Box>
  );
};

export default Dashboard;
