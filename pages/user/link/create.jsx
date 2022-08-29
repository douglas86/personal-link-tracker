import { useContext, useEffect } from "react";

import { Context } from "../../../Context/Store";
import useFetch from "../../../hooks/useFetch";
import { spinner } from "../../../components/UI/atom/spinner";
import LinkTemplate from "../../../components/UI/template/LinkTemplate";

const Create = () => {
  const data = useFetch("/api/category").data;
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "populate_store", data: data ? data : {} });
  }, [data, dispatch]);

  return <div>{data ? <LinkTemplate /> : spinner()}</div>;
};

export default Create;
