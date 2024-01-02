import { Flex } from '@chakra-ui/react';
import NavigationLink from './NavigationLink';

const SideMenu = () => {
  return (
    <Flex
      direction="column"
      bg="gray.50"
      width={300}
      height="100dvh"
      paddingX={4}
      paddingY={12}
      borderRight="1px solid"
      borderColor="gray.300"
      shadow="2px 0px 5px 0px #E9D8FD"
    >
      <NavigationLink url="/" name="Dashboard" />
      <NavigationLink url="/produtores" name="Produtores" />
    </Flex>
  );
};

export default SideMenu;
