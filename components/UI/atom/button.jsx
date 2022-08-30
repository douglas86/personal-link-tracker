import { Button } from "react-bootstrap";

import styles from "./styles/button.module.css";

export const button = (variant, btnName, clickHandler, disabled = false) => (
  <Button
    className={styles.button}
    variant={variant}
    onClick={clickHandler}
    disabled={disabled}
  >
    {btnName}
  </Button>
);
