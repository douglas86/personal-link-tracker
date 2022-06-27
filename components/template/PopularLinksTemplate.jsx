import { GetRoute } from "../../API";
import { img } from "../atom/image";
import { spinner } from "../atom/spinner";
import PopularLinks from "../organism/PopularLinks";

const PopularLinksTemplate = ({ image }) => {
  const fetcher = GetRoute(`/api/s3?s3BucketKey=${image}`);

  return (
    <>
      {fetcher.data
        ? img(`data:image/jpeg;base64,${fetcher.data}`, 250, 250)
        : spinner()}
      <PopularLinks />
    </>
  );
};

export default PopularLinksTemplate;
