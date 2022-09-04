import { links, img } from "../atom";

import styles from "./styles/CategoryCard.module.css";

const CategoryCard = ({ value }) => {
  const { title, image } = value;

  return (
    <div className={styles.div}>
      {links(
        `/links/${title}`,
        <a style={{ textDecoration: "none" }}>
          <div className={styles.container}>
            <div className={styles.image}>
              {img(`data:image/jpeg;base64,${image}`, 200, 200)}
            </div>
            <div className={styles.title}>
              <h1 className={styles.h1}>{title}</h1>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default CategoryCard;
