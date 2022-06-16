import { submitButton } from "../atom/button2";
import { img } from "../atom/image";
import { links } from "../atom/links";
import { titles } from "../atom/titles";

import styles from "./categoryCard.module.css";

export const updateDeleteCategory = (
  { id, title, description, image },
  handleDelete,
  handleUpdate
) => {
  const updateItem = () => {
    return handleUpdate(id, title, description, image);
  };

  const deleteItem = () => {
    return handleDelete({ id, title });
  };

  return (
    <div
      style={{
        width: "20rem",
        height: "12rem",
        padding: "2%",
      }}
    >
      <div className={styles.container}>
        <div className={styles.image}>
          {links(
            `/links/${title}`,
            <a>{img(`data:image/jpeg;base64,${image}`, 200, 200)}</a>
          )}
        </div>
        <div className={styles.titles}>
          {titles(title)}
          <div className={styles.buttons}>
            {submitButton(updateItem, "Update", "btn btn-outline-success")}
            {submitButton(deleteItem, "Delete", "btn btn-outline-danger")}
          </div>
        </div>
      </div>
    </div>
  );
};
