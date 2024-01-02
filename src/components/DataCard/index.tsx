import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react';

type DataCardProps = {
  title: string;
  value: number;
  unit?: string;
};

const DataCard: React.FC<DataCardProps> = ({ title, value, unit }) => {
  return (
    <Card
      bg="purple.600"
      border="1px solid white"
      color="gray.100"
      width={300}
      borderRadius={16}
    >
      <CardHeader>
        <Text fontSize={20} fontWeight={700}>
          {title}
        </Text>
      </CardHeader>
      <CardBody paddingTop={0}>
        <Text as="span" fontSize={34}>{`${value}`}</Text>
        {unit && <Text as="span">{` ${unit}`}</Text>}
      </CardBody>
    </Card>
  );
};

export default DataCard;
