import React, { PropsWithChildren } from 'react';
import SideMenu from '../SideMenu';
import { Flex } from '@chakra-ui/react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex>
      <SideMenu />
      {children}
    </Flex>
  );
};

export default Layout;
