import Pagination from '../../../components/pagination';

const My_links = () => {
  return (
    <>
      <Pagination endpoint="/api/data" user="true" />
    </>
  );
};

export default My_links;
