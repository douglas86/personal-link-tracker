import Pagination from "../organism/Pagination";

const PaginationTemplates = ({ data, len, router }) => {
  return (
    <>
      <Pagination data={data} len={len} router={router} />
    </>
  );
};

export default PaginationTemplates;
