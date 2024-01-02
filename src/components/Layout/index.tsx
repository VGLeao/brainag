import React, { PropsWithChildren } from 'react';
import SideMenu from '../SideMenu';
import { Box, Flex } from '@chakra-ui/react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex>
      <SideMenu />
      <Box height="100dvh" overflowY="scroll" width="100%" padding={12}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
