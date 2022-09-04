import moment from "moment";

import { alert, title } from "../atom";

export const mapToPagination = (item) => (
  <>
    {alert(
      "info",
      title(item.title),
      <>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <p>{item.userName}</p>
          </div>
          <div style={{ position: "absolute", right: "50px" }}>
            <p>clicks: {item.clicks}</p>
          </div>
        </div>
        <hr />
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            {item.type === "Paid" ? (
              <div style={{ display: "flex" }}>
                <p>Type: </p>
                <p
                  style={{
                    color: "red",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                >
                  {item.type}
                </p>
                <p>/ Free</p>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "5px", marginLeft: "5px" }}>
                  Type: Paid /
                </p>
                <p style={{ color: "red" }}>{item.type}</p>
              </div>
            )}
          </div>
          <div style={{ position: "absolute", right: "50px" }}>
            {item.medium === "Book" ? (
              <div style={{ display: "flex" }}>
                <p>Medium: </p>
                <p
                  style={{
                    color: "red",
                    marginRight: "5px",
                    marginLeft: "5px",
                  }}
                >
                  {item.medium}
                </p>
                <p>/ Video</p>
              </div>
            ) : (
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "5px", marginLeft: "5px" }}>
                  Medium: Book /{" "}
                </p>
                <p style={{ color: "red" }}>{item.medium}</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ position: "relative" }}>
            <p>{item.userName}</p>
          </div>
          <div style={{ position: "absolute", right: "50px" }}>
            <p>
              created:{" "}
              {moment.utc(item.createdAt).local().startOf("seconds").fromNow()}
            </p>
          </div>
        </div>
      </>
    )}
  </>
);
