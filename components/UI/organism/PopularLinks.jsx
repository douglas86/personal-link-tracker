import { spinner, img } from "../atom";

import useFetch from "../../../hooks/useFetch";

const PopularLinks = ({ s3Image }) => {
  const { data } = useFetch(`/api/s3?s3BucketKey=${s3Image}`);

  return (
    <div>
      {data ? img(`data:image/jpeg;base64,${data}`, 250, 250) : spinner()}
      <p>Popular Links to come, this is just a placeholder for now</p>
    </div>
  );
};

export default PopularLinks;
