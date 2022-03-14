import { Fetcher } from '../API';

const Home = () => {
  const fetching = Fetcher('/api/AWS/s3');
  console.log('fetching', fetching);
  return <h1>This is the home page</h1>;
};

export default Home;
