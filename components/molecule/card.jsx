import { submitButton } from '../atom/button';
import { image } from '../atom/image';
import { links } from '../atom/links';
import { titles } from '../atom/titles';

import styles from './card.module.css';

export const card = (title, img, handleSubmit) => (
    <>
        <div className={styles.container}>
            <div className={styles.image}>
                {links(`/links/${title}`, <a>{image(img, 200, 200)}</a>)}
            </div>
            <div className={styles.titles}>
                {titles(title)}
                <div className={styles.buttons}>
                    {submitButton(
                        handleSubmit,
                        'Update',
                        'btn btn-outline-success'
                    )}
                    {submitButton(
                        handleSubmit,
                        'Delete',
                        'btn btn-outline-danger'
                    )}
                </div>
            </div>
        </div>
    </>
);
