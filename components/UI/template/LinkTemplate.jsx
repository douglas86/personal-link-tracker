import { Container } from "react-bootstrap";

import CategoryPanel from "../organism/CategoryPanel";
import Form from "../organism/Form";

import styles from "./styles/LinkTemplate.module.css";

const LinkTemplate = () => {
  const array = ["title", "url"];
  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.flex_left}>
          <CategoryPanel />
        </div>
        <div className={styles.flex_right}>
          <Form array={array} />
        </div>
      </div>
    </Container>
  );
};

export default LinkTemplate;
