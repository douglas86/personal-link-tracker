import { GetRoute } from "../../API";

import { spinner } from "../atom/spinner";

import styles from "./styles.module.css";
import { category } from "../molecule/category";
import { Container } from "react-bootstrap";

const CategoryMap = () => {
  const fetcher = GetRoute("/api/category").data;
  // const { handleUpdateClick, handleConfirm } = Handler();

  console.log("fetcher", fetcher);

  const handleUpdateClick = () => {
    console.log("The Update button was clicked");
  };

  const handleConfirm = () => {
    console.log("The delete button was clicked");
  };

  return (
    <Container>
      {fetcher
        ? Object.entries(fetcher).map(([key, value]) => (
            <div key={key} className={styles.root}>
              {category(value, true, handleUpdateClick, handleConfirm)}
            </div>
          ))
        : spinner()}
    </Container>
  );
};

export default CategoryMap;

// import Handler from "./Handler";
// import { category2 } from "../molecule/category2";
//
// import styles from "./styles.module.css";
//
// function CategoryMap({ arr }) {
//   const { handleUpdateClick, handleConfirm } = Handler();
//
//   return (
//     <>
//       {arr.map((items) => (
//         <div key={items[0]} className={styles.root}>
//           {category2(items[1], handleUpdateClick, handleConfirm)}
//         </div>
//       ))}
//     </>
//   );
// }
//
// export default CategoryMap;
