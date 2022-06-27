import { Alert, Container } from "react-bootstrap";
import styles from "./styles.module.css";
import PopularLinksTemplate from "../../components/template/PopularLinksTemplate";
import { titles } from "../../components/atom/titles";
import renderHTML from "react-render-html";
import PaginationTemplates from "../../components/template/PaginationTemplates";

const Links = ({ category, len, data }) => {
  console.log("category", JSON.parse(category));
  const { description, s3BucketKey, title } = JSON.parse(category)[0];

  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.leftSide}>
          {titles(title)}
          <Alert variant="secondary">{renderHTML(description)}</Alert>
          <PaginationTemplates
            len={JSON.parse(len)}
            data={JSON.parse(data)}
            router={title}
          />
        </div>
        <div className={styles.rightSide}>
          <PopularLinksTemplate image={s3BucketKey} />
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async ({ query }) => {
  const category = await prisma.category.findMany({
    where: { title: query.slug },
  });

  const len = await prisma.links.findMany({
    where: { categoryNames: { hasEvery: [query.slug] } },
  });

  const data = await prisma.links.findMany({
    where: { categoryNames: { hasEvery: [query.slug] } },
    take: 2,
  });

  return {
    props: {
      category: JSON.stringify(category),
      len: JSON.stringify(len.length),
      data: JSON.stringify(data),
    },
  };
};

export default Links;
