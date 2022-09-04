import { useContext } from "react";

import CategoryCard from "../molecule/CategoryCard";
import { spinner } from "../atom";

import { Context } from "../../../Context/Store";

import styles from "./styles/CategoryCards.module.css";

const CategoryCards = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div className={styles.div}>
      {state[0]
        ? Object.entries(state[0].data).map(([key, value]) => (
            <div key={key}>
              <CategoryCard value={value} />
            </div>
          ))
        : spinner()}
    </div>
  );
};

export default CategoryCards;
