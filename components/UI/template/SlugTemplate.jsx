import { useContext } from "react";
import { Container } from "react-bootstrap";

import Pagination from "../organism/Pagination";
import { alert, spinner, title } from "../atom";

import { Context } from "../../../Context/Store";

import styles from "./styles/SlugTemplate.module.css";
import PopularLinks from "../organism/PopularLinks";

const SlugTemplate = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <Container>
      <div className={styles.flex}>
        <div className={styles.flex_left}>
          {state[0] && Object.keys(state[0]).includes("category") ? (
            <>
              {title(state[0].category[0].title)}
              {alert("secondary", state[0].category[0].description)}
              <Pagination />
            </>
          ) : (
            spinner()
          )}
        </div>
        <div className={styles.flex_right}>
          <PopularLinks />
        </div>
      </div>
    </Container>
  );
};

export default SlugTemplate;
