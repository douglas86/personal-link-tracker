import prisma from "../../../lib/prisma";
import { Container, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import styles from "../../../public/styles/create.module.css";

const Create = (props) => {
  const response = props ? JSON.parse(props.data) : undefined;
  const { data: session } = useSession();
  const [state, setState] = useState({
    postedBy: props ? JSON.parse(props.user).id : undefined,
    title: "",
    url: "",
    type: "",
    medium: "",
    categories: [],
    message: "",
    alertColor: "",
    showAlert: false,
  });

  console.log("state", state);

  const {
    postedBy,
    title,
    url,
    type,
    medium,
    categories,
    message,
    alertColor,
    showAlert,
  } = state;

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setState({ ...state, showAlert: false, buttonText: "Submit" });
      }, 10000);
    }
  }, [showAlert, state, setState]);

  const handleToggle = (c) => () => {
    const clickedCategory = categories.indexOf(c);
    const all = [...categories];
    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      postedBy,
      title,
      url,
      categories,
      type,
      medium,
    };
    try {
      await fetch("/api/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const result = await res.json();
        setState({
          ...state,
          alertColor: "success",
          showAlert: true,
          message: result.message,
        });
      });
    } catch (err) {
      const result = err.json();
      setState({
        ...state,
        alertColor: "danger",
        showAlert: true,
        message: result.message,
      });
    }
  };

  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Title</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, title: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">URL</label>
        <input
          type="text"
          onChange={(e) => setState({ ...state, url: e.target.value })}
          className="form-control"
        />
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

  console.log("stateMessage", state.success);

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
        <div className={styles.flex_right}>
          {showAlert && message ? (
            <Alert
              style={{ marginTop: "5px" }}
              variant={alertColor}
              onClose={() => setState({ ...state, showAlert: false })}
              dismissible
            >
              <Alert.Heading>{message}</Alert.Heading>
            </Alert>
          ) : null}
          {showForm()}
        </div>
      </div>
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const user = session
    ? await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })
    : null;
  const result = await prisma.category.findMany();
  const data = JSON.stringify(result);
  return {
    props: {
      data,
      user: JSON.stringify(user),
    },
  };
};

export default Create;
