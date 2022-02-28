import prisma from "../../../lib/prisma";
import { Container } from "react-bootstrap";
import { useState } from "react";

const Create = (props) => {
  const response = props ? JSON.parse(props.data) : undefined;
  const [state, setState] = useState({});
  const [type, setType] = useState("");
  const [medium, setMedium] = useState("");

  const showCategories = () => {
    return (
      <>
        {response
          ? response.map((item) => (
              <li className="list-unstyled" key={item.id}>
                <input
                  type="checkbox"
                  name={item.title}
                  onChange={(e) => {
                    e.target.checked
                      ? setState({
                          ...state,
                          [item.title]: e.target.checked,
                        })
                      : delete state[item.title];
                  }}
                  className="mr-2"
                />
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
            onChange={() => setType("free")}
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
            onChange={() => setType("paid")}
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
            onChange={() => setMedium("Video")}
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
            onChange={() => setMedium("Book")}
            value="book"
            className="form-check-input"
            name="medium"
          />{" "}
          Book
        </label>
      </div>
    </>
  );

  return (
    <div>
      <Container>
        <h1>Create page</h1>
        <label className="text-muted ml-4">Categories</label>
        <ul style={{ maxHeight: "100px", overflowY: "scroll", width: "200px" }}>
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
      </Container>
    </div>
  );
};

export const getServerSideProps = async () => {
  const result = await prisma.category.findMany();
  const data = JSON.stringify(result);
  console.log("data", result);
  return {
    props: {
      data,
    },
  };
};

export default Create;
