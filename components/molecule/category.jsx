import { img } from "../atom/image";
import { links } from "../atom/links";
import { titles } from "../atom/titles";
import { submitButton } from "../atom/button";

import styles from "./styles.module.css";

export const category = (
  { id, description, title, image },
  showButton,
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
          {showButton ? (
            <div className={styles.buttons}>
              {submitButton(updateItem, "Update", "btn btn-outline-success")}
              {submitButton(deleteItem, "Delete", "btn btn-outline-danger")}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
