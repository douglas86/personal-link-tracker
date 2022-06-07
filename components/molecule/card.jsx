import { submitButton } from '../atom/button';
import { img } from '../atom/image';
import { links } from '../atom/links';
import { titles } from '../atom/titles';

import styles from './card.module.css';

export const card = (cardData, handleDelete, handleUpdate) => {
    const { id, title, image } = cardData;

    const updateItem = () => {
        return handleUpdate(id, title, image);
    };

    // TODO: this needs to give an alert to promt for if you want to delete or not
    const deleteItem = () => {
        return handleDelete({ id, title });
    };

    return (
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
                    {submitButton(
                        updateItem,
                        'Update',
                        'btn btn-outline-success'
                    )}
                    {submitButton(
                        deleteItem,
                        'Delete',
                        'btn btn-outline-danger'
                    )}
                </div>
            </div>
        </div>
    );
};
