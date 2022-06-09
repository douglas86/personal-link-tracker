import { submitButton } from '../atom/button';
import { img } from '../atom/image';
import { links } from '../atom/links';
import { titles } from '../atom/titles';

import styles from './categoryCard.module.css';

export const displayCategory = (cardData) => {
    const { id, title, image } = cardData;

    return (
        <div
            style={{
                width: '20rem',
                height: '12rem',
                padding: '2%',
            }}
        >
            {links(
                `/links/${title}`,
                <a style={{ textDecoration: 'none' }}>
                    <div className={styles.container}>
                        <div className={styles.image}>
                            {img(`data:image/jpeg;base64,${image}`, 200, 200)}
                        </div>
                        <div className={styles.titles}>{titles(title)}</div>
                    </div>
                </a>
            )}
        </div>
    );
};
