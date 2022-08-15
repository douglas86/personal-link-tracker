import { Button } from "react-bootstrap";

export const button = (variant, btnName, clickHandler) => (
  <Button variant={variant} onClick={clickHandler}>
    {btnName}
  </Button>
);
