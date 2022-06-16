import { useState } from "react";
import { alert } from "../atom/alert";

const Alert = () => {
  const [color] = useState();
  const [message] = useState("");

  return <>{alert(color, message)}</>;
};

export default Alert;
