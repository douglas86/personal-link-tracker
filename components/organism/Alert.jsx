import { useState } from "react";
import { alert } from "../atom/alert2";

const Alert = () => {
  const [color] = useState();
  const [message] = useState("");

  return <>{alert(color, message)}</>;
};

export default Alert;
