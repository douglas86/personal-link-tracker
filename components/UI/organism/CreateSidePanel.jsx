import { useReducer } from "react";
import { reducer } from "../../../Context/CreateLink/reducer";

const CreateSidePanel = () => {
  const [state, dispatch] = useReducer(reducer);

  console.log("state2", state);

  return (
    <div>
      <h1>Side Panel</h1>
    </div>
  );
};

export default CreateSidePanel;
