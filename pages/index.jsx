import Index from '../components/pages/HomePage/Index';
import { HomeProvider } from '../components/pages/PageContext/HomeContext';

const Home = () => {
  return (
    <HomeProvider>
      <Index />
    </HomeProvider>
  );
};

export default Home;
