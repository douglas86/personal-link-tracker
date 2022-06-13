import Handler2 from "./Handler2";
import { category2 } from "../molecule/category2";

import styles from "./styles.module.css";

function CategoryMap2({ arr }) {
  const { handleUpdate, handleConfirm } = Handler2();

  return (
    <>
      {arr.map((items) => (
        <div key={items[0]} className={styles.root}>
          {category2(items[1], handleUpdate, handleConfirm)}
        </div>
      ))}
    </>
  );
}

export default CategoryMap2;
