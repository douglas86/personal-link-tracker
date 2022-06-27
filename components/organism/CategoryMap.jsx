import Handler from "./Handler";
import { category2 } from "../molecule/category2";

import styles from "./styles.module.css";

function CategoryMap({ arr }) {
  const { handleUpdateClick, handleConfirm } = Handler();

  return (
    <>
      {arr.map((items) => (
        <div key={items[0]} className={styles.root}>
          {category2(items[1], handleUpdateClick, handleConfirm)}
        </div>
      ))}
    </>
  );
}

export default CategoryMap;
