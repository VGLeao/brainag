import { Flex } from '@chakra-ui/react';
import NavigationLink from './NavigationLink';

const SideMenu = () => {
  // const { isOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction="column"
      bg="teal.300"
      width={300}
      height="100dvh"
      padding={4}
    >
      <NavigationLink url="/" name="Home" />
      <NavigationLink url="/produtores" name="Produtores" />
    </Flex>
  );
};

export default SideMenu;
