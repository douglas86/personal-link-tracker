import { links } from '../atom/links';
import styles from '../../public/static/styles/index.module.css';
import { image } from '../atom/image';

export const mapToLinks = (url, img, width, height, title) => {
    return (
        <>
            {links(
                url,
                <a className={styles.button}>
                    <div className={styles.contents}>
                        <div className={styles.flex_image}>
                            {image(img, width, height)}
                        </div>
                        <div className={styles.title}>
                            <h5>{title}</h5>
                        </div>
                    </div>
                </a>
            )}
        </>
    );
};
