import { Container } from "react-bootstrap";

import CategoryPanel from "../organism/CategoryPanel";

import styles from "./styles/LinkTemplate.module.css";

const LinkTemplate = () => {
  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.flex_left}>
          <CategoryPanel />
        </div>
        <div className={styles.flex_right}>
          <h1>Right Side</h1>
        </div>
      </div>
    </Container>
  );
};

export default LinkTemplate;
