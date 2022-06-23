import { Alert } from "react-bootstrap";
import { links } from "../atom/links";

export const pagination = ({
  title,
  url,
  type,
  medium,
  clicks,
  userName,
  categoryNames,
}) => (
  <Alert
    variant="success"
    style={{ marginTop: "100px", marginBottom: "150px" }}
  >
    <Alert.Heading>{title}</Alert.Heading>

    {links(
      url,
      <a>
        <p>{url}</p>
      </a>
    )}
    <p>User: {userName}</p>
    <hr />
    <div style={{ display: "flex" }}>
      {type === "Paid" ? (
        <div style={{ display: "flex" }}>
          <p style={{ color: "red", marginRight: "5px" }}>{type} </p>
          <p>/ Free</p>
        </div>
      ) : (
        <div style={{ display: "flex" }}>
          <p style={{ marginRight: "5px" }}>Paid / </p>
          <p style={{ color: "red" }}>{type}</p>
        </div>
      )}
      <div style={{ marginLeft: "20px" }}>
        {medium === "Book" ? (
          <div style={{ display: "flex" }}>
            <p style={{ color: "red", marginRight: "5px" }}>{medium} </p>
            <p>/ Video</p>
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "5px" }}>Book / </p>
            <p style={{ color: "red" }}>{medium}</p>
          </div>
        )}
      </div>
      <p style={{ marginLeft: "auto" }}>{clicks} clicks</p>
    </div>
    <div style={{ display: "flex", marginRight: "5px" }}>
      <p style={{ marginRight: "5px" }}>categories: </p>
      {categoryNames.map((items, index) => (
        <p key={index} style={{ display: "inline-block", marginRight: "5px" }}>
          {items},
        </p>
      ))}
    </div>
  </Alert>
);
