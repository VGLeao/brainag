import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import { theme } from './styles/theme.ts';
import { ProducersContextProvider } from './contexts/producers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProducersContextProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ProducersContextProvider>
  </React.StrictMode>
);
