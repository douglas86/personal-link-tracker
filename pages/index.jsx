import { useContext } from 'react';

import { HomeContext } from '../Context/HomeContext';

import Index from '../components/HomePage';
import Card from '../components/HomePage/Card';

const Home = () => {
  const context = useContext(HomeContext);
  const { cardTitle } = context.state;

  console.log('cardTitle', cardTitle);

  const isComponent = () => {
    switch (cardTitle) {
      case 'Card':
        return <Card />;
      default:
        return <Index />;
    }
  };

  return <>{isComponent()}</>;
};

export default Home;
