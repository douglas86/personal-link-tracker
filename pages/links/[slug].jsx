import { Container } from "react-bootstrap";

import PopularLinksTemplate from "../../components/template/PopularLinksTemplate";
import SlugTemplate from "../../components/template/SlugTemplate";

import styles from "./styles.module.css";

const Links = ({ category, len, data }) => {
  const { s3BucketKey } = JSON.parse(category)[0];

  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.leftSide}>
          <SlugTemplate
            category={JSON.parse(category)[0]}
            len={JSON.parse(len)}
            data={JSON.parse(data)}
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
