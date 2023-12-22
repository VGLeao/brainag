import Layout from '../components/Layout';
import Home from '../pages/Home';
import Producers from '../pages/Producers';

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/produtores',
    element: (
      <Layout>
        <Producers />
      </Layout>
    ),
  },
];
