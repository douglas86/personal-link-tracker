import { Alert } from "react-bootstrap";

export const alert = (color, message, content = null) => (
  <>
    <Alert style={{ marginTop: "5px" }} variant={color}>
      <Alert.Heading>{message}</Alert.Heading>
      {content}
    </Alert>
  </>
);
