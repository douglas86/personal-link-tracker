import Pagination from "../organism/Pagination";
import { useRouter } from "next/router";

const PaginationTemplates = ({ data, len }) => {
  const router = useRouter().pathname.split("/");

  return (
    <>
      <Pagination router={router[2]} data={data} len={len} />
    </>
  );
};

export default PaginationTemplates;
