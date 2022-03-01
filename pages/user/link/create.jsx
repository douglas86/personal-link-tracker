import prisma from "../../../lib/prisma";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../../../public/styles/create.module.css";

const Create = (props) => {
  const response = props ? JSON.parse(props.data) : undefined;
  const { data: session } = useSession();
  const [state, setState] = useState({
    type: "",
    medium: "",
    categories: [],
  });

  const { type, medium, categories } = state;

  const handleToggle = (c) => () => {
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    console.log("all >> categories", all);
    setState({ ...state, categories: all });
  };

  const showCategories = () => {
    return (
      <>
        {response
          ? response.map((item) => (
              <li className="list-unstyled" key={item.id}>
                <input
                  type="checkbox"
                  name={item.title}
                  className="mr-2"
                  onChange={handleToggle(item.id)}
                />{" "}
                <label className="form-check-label">{item.title}</label>
              </li>
            ))
          : null}
      </>
    );
  };

  const showTypes = () => (
    <>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() => setState({ ...state, type: "free" })}
            value="free"
            className="form-check-input"
            name="type"
          />{" "}
          Free
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() => setState({ ...state, type: "paid" })}
            value="paid"
            className="form-check-input"
            name="type"
          />{" "}
          Paid
        </label>
      </div>
    </>
  );
  const showMedium = () => (
    <>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() => setState({ ...state, medium: "video" })}
            value="video"
            className="form-check-input"
            name="medium"
          />{" "}
          Video
        </label>
      </div>
      <div className="form-check ml-3">
        <label className="form-check-label">
          <input
            type="radio"
            onChange={() => setState({ ...state, medium: "book" })}
            value="book"
            className="form-check-input"
            name="medium"
          />{" "}
          Book
        </label>
      </div>
    </>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    return (
      <>
        <h1>This is the submit</h1>
      </>
    );
  };

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input type="text" className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input type="text" className="form-control" />
      </div>
      <button
        disabled={!session}
        className={`btn btn-outline-warning ${styles.button}`}
        type="submit"
      >
        {session ? "Post" : "Login to post"}
      </button>
    </form>
  );

  return (
    <Container>
      <div className={styles.flex_container}>
        <div className={styles.flex_left}>
          <h1>Create page</h1>
          <label className="text-muted ml-4">Categories</label>
          <ul
            style={{
              maxHeight: "100px",
              overflowY: "scroll",
              width: "200px",
            }}
          >
            {showCategories()}
          </ul>
          <div className="form-group">
            <label className="text-muted ml-4">Type</label>
            {showTypes()}
          </div>
          <div className="form-group">
            <label className="text-muted ml-4">Medium</label>
            {showMedium()}
          </div>
        </div>
        <div className={styles.flex_right}>{showForm()}</div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async () => {
  const result = await prisma.category.findMany();
  const data = JSON.stringify(result);
  return {
    props: {
      data,
    },
  };
};

export default Create;
