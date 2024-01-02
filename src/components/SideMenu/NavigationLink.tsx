import { NavLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

type NavigationLinkProps = {
  url: string;
  name: string;
};

const activeStyles = {
  bg: 'purple.600',
  color: 'white',
};

const hoverStyles = { bg: 'purple.700', color: 'white' };

const NavigationLink: React.FC<NavigationLinkProps> = ({ url, name }) => {
  return (
    <ChakraLink
      as={NavLink}
      to={url}
      _activeLink={activeStyles}
      height={12}
      borderRadius={12}
      paddingLeft={4}
      alignItems="center"
      display="flex"
      marginBottom={4}
      fontWeight={700}
      _hover={hoverStyles}
    >
      {name}
    </ChakraLink>
  );
};

export default NavigationLink;
