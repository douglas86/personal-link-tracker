import { useContext } from "react";

import ShowCheckbox from "../molecule/ShowCheckbox";
import ShowRadio from "../molecule/ShowRadio";
import { spinner, label } from "../atom";

import { Context } from "../../../Context/Store";

import styles from "./styles/CategoryPanel.module.css";

const CategoryPanel = () => {
  const [state, dispatch] = useContext(Context);

  const types = ["Free", "Paid"];
  const medium = ["Book", "Video"];

  return (
    <div>
      {state[0].data && Object.keys(state[0].data).length !== 0 ? (
        <>
          {Object.values(state[0].data).map(({ id, title }) => (
            <div key={id}>
              {label("text-muted ml-4", "Categories")}
              <div className={styles.checkboxes}>
                <ShowCheckbox title={title} />
              </div>
            </div>
          ))}
          {label("text-muted ml-4", "Types")}
          {types.map((items, index) => (
            <div key={index} className="form-check">
              <ShowRadio items={items} name="types" />
            </div>
          ))}
          {label("text-muted ml-4", "Medium")}
          {medium.map((items, index) => (
            <div key={index} className="form-check">
              <ShowRadio items={items} name="medium" />
            </div>
          ))}
        </>
      ) : (
        spinner()
      )}
    </div>
  );
};

export default CategoryPanel;
