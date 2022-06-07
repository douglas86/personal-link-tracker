import { Container } from 'react-bootstrap';
import renderHTML from 'react-render-html';

import { img } from '../atom/image';
import { spinner } from '../atom/spinner';
import { GetRoute } from '../../API/index';
import Pagination from '../pagination';
import styles from '../../public/static/styles/[slug].module.css';

const SlugTemplate = ({ slug, data }) => {
    const s3Image =
        data !== undefined
            ? GetRoute(`/api/s3?s3BucketKey=${data[0].s3BucketKey}`)
            : undefined;

    return (
        <div>
            <Container>
                {data !== undefined ? (
                    <div className={styles.flex_container}>
                        <div className={styles.flex_left}>
                            <h1 className="display-4 font-weight-bold">
                                {data[0].title} - URL/Links
                            </h1>
                            <div className="lead alert alert-secondary pt-4">
                                {renderHTML(data[0].description || '')}{' '}
                            </div>
                            <Pagination slug={slug} />
                        </div>
                        <div className={styles.flex_right}>
                            {s3Image.data === undefined
                                ? spinner()
                                : img(
                                      `data:image/jpeg;base64,${s3Image.data}`,
                                      400,
                                      250
                                  )}
                            <div className={styles.popular_links}>
                                {' '}
                                <h2 className="lead">
                                    Most popular in {data[0].title}
                                </h2>
                                <p>show popular links</p>{' '}
                            </div>
                        </div>
                    </div>
                ) : (
                    spinner()
                )}
            </Container>
        </div>
    );
};

export default SlugTemplate;
