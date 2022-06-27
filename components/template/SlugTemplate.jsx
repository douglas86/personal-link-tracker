import { Alert } from "react-bootstrap";
import renderHTML from "react-render-html";

import PaginationTemplates from "./PaginationTemplates";
import { titles } from "../atom/titles";

const SlugTemplate = ({ category, len, data }) => {
  const { description, title } = category;
  return (
    <>
      {titles(title)}
      <Alert variant="secondary">{renderHTML(description)}</Alert>
      <PaginationTemplates len={len} data={data} router={title} />
    </>
  );
};

export default SlugTemplate;
