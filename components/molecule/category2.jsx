import { links } from "../atom/links";
import { img } from "../atom/image";

import styles from "./styles.module.css";
import { titles } from "../atom/titles";
import { submitButton } from "../atom/button";

export const category2 = (
  { id, title, description, image },
  handleUpdateClick,
  handleDelete
) => {
  const updateItem = () => {
    return handleUpdateClick(id, title, description, image);
  };

  const deleteItem = () => {
    return handleDelete(id, title);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.image}>
          {links(
            `/links/${title}`,
            <a>{img(`data:image/jpeg;base64,${image}`, 200, 200)}</a>
          )}
        </div>
        <div className={styles.title}>
          {titles(title)}
          <div className={styles.buttons}>
            {submitButton(
              updateItem,
              "Update",
              "button button-outline-success"
            )}
            {submitButton(deleteItem, "Delete", "button button-outline-danger")}
          </div>
        </div>
      </div>
    </div>
  );
};
