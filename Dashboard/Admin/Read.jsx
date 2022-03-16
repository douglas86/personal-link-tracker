import Header from '../../components/Admin/header';
import Apis from '../../API';

const Read = () => {
  const { Fetcher } = Apis();
  const fetching = Fetcher('/api/category');
  console.log('fetching', fetching);
  return (
    <>
      <Header />
      <h1>This is the categories page</h1>
    </>
  );
};

export default Read;
