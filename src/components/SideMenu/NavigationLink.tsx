import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

type NavigationLinkProps = {
  url: string;
  name: string;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({ url, name }) => {
  return (
    <ChakraLink as={NavLink} to={url} _activeLink={{ bg: 'red' }}>
      {name}
    </ChakraLink>
  );
};

export default NavigationLink;
