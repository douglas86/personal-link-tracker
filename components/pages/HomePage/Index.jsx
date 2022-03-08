import { useContext } from 'react';

import { HomeContext } from '../PageContext/HomeContext';
import Home from './Home';
import Card from './Card';

const Index = () => {
  const context = useContext(HomeContext);
  const { component } = context.state;

  const isComponent = () => {
    switch (component) {
      case 'Card':
        return <Card />;
      default:
        return <Home />;
    }
  };

  return <>{isComponent()}</>;
};

export default Index;
