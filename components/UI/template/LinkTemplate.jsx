import { Container } from "react-bootstrap";

import CategoryPanel from "../organism/CategoryPanel";

import styles from "./styles/LinkTemplate.module.css";
import Form from "../organism/Form";

// TODO: next step is to create the form
// TODO: Create a form organism that will pass in an array of inputs

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
