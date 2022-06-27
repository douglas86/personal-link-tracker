import { Alert } from "react-bootstrap";
import styles from "../../public/static/styles/[slug].module.css";

export const pag = (item) => (
  <>
    <Alert variant="primary">
      <Alert.Heading>{item.title}</Alert.Heading>
      <p>{item.url}</p>
      <div className={styles.alert_bottom_flex}>
        <>
          {item.medium === "Book" ? (
            <p className={styles.alert_p}>Book</p>
          ) : (
            <p>Book/</p>
          )}
          {item.medium === "Video" ? (
            <p className={styles.alert_p}>Video</p>
          ) : (
            <p>/Video</p>
          )}
          {item.type === "Free" ? (
            <p style={{ marginLeft: "10px" }} className={styles.alert_p}>
              Free
            </p>
          ) : (
            <p style={{ marginLeft: "10px" }}>Free/</p>
          )}
          {item.type === "Paid" ? (
            <p className={styles.alert_p}>Paid</p>
          ) : (
            <p>/Paid</p>
          )}
          <p style={{ marginLeft: "10%" }}>Created by {item.userName}</p>
        </>
      </div>
    </Alert>
  </>
);
