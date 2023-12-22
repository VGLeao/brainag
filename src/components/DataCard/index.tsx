import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

type DataCardProps = {
  title: string;
  value: number;
  unit?: string;
};

const DataCard: React.FC<DataCardProps> = ({ title, value, unit }) => {
  return (
    <Card boxShadow="2px 2px 4px 2px rgba(0,50,115,1)" bg="#A8E0FF">
      <CardHeader>
        <Text>{title}</Text>
      </CardHeader>
      <CardBody>
        <Text as="span">{`${value}`}</Text>
        {unit && <Text as="span">{`${unit}`}</Text>}
      </CardBody>
    </Card>
  );
};

export default DataCard;
