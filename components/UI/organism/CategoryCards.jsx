import { useContext } from "react";

import CategoryCard from "../molecule/CategoryCard";

import { Context } from "../../../Context/Store";

import styles from "./styles/CategoryCards.module.css";

const CategoryCards = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div className={styles.div}>
      {Object.entries(state).map(([key, value]) => (
        <div key={key}>
          <CategoryCard value={value} />
        </div>
      ))}
    </div>
  );
};

export default CategoryCards;
