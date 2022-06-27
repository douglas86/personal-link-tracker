import { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";

import prisma from "../../../lib/prisma";
import createHelpers from "../../../Helper/pages/user/link/createHelpers";
import styles from "../../../public/static/styles/create.module.css";

const Create = (props) => {
  const categories = JSON.parse(props.result);
  const { state, setState, showCategories, showTypes, showMedium, showForm } =
    createHelpers(categories);
  const { message, showAlert, alertColor } = state;

  const [screenSize, setScreenSize] = useState({
    dynamicWidth: 0,
  });

  const setDimension = () => {
    setScreenSize({
      dynamicWidth: window.innerWidth,
    });
  };

  useEffect(function mount() {
    window.addEventListener("resize", setDimension);
    return function unMount() {
      window.removeEventListener("resize", setDimension);
    };
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setState({ ...state, showAlert: false });
      }, 10000);
    }
  }, [setState, state, showAlert]);

  return (
    <Container>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1>Submit Link/URL</h1>
          <label className="text-muted ml-4">Categories</label>
          <ul
            style={{
              maxHeight: "100px",
              overflowY: "scroll",
              listStyle: "none",
              paddingLeft: 0,
              width: screenSize.dynamicWidth < 800 ? "50%" : "200px",
              margin:
                screenSize.dynamicWidth < 800 && screenSize.dynamicWidth > 0
                  ? "1% 25%"
                  : "0%",
            }}
          >
            {showCategories()}
          </ul>
          <div className="form-group">
            <label className="text-muted ml-4">Types</label>
            {showTypes()}
          </div>
          <div className="form-group">
            <label className="text-muted ml-4">Medium</label>
            {showMedium()}
          </div>
        </div>
        <div className={styles.flex_right}>
          {showAlert ? (
            <Alert variant={alertColor}>
              <Alert.Heading>{message}</Alert.Heading>
            </Alert>
          ) : null}
          {showForm()}
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const Categories = await prisma.category.findMany();
  const result = JSON.stringify(Categories);

  return {
    props: { result },
  };
};

export default Create;
