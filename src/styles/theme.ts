import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: {
      '500': '#6B46C1',
      '700': '#44337A',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#EEF8FF',
      },
    },
  },
});
