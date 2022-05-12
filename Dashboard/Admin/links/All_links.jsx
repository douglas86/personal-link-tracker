import Pagination from '../../../components/pagination';

const All_links = () => {
  return (
    <>
      <Pagination endpoint="/api/data" user="false" />
    </>
  );
};

export default All_links;
