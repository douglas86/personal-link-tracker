import { useState, useEffect } from 'react';
import InfinteScroll from 'react-infinite-scroller';
import { Alert, Spinner } from 'react-bootstrap';

import { pagination } from '../API/index.jsx';
import styles from '../public/static/styles/[slug].module.css';

// Description of component
// takes in a name as a slug
// allLinks - this will gather all data of all the links in db
// myLinks - this is to gather all links based on logged in user
// if slug is given as an argument - it will gather links based on category name

// FIXME: needing to do a cleanup function with useEffect
// FIXME: as react is complaining about react state update on an unmounted component

const Pagination = ({ slug }) => {
    const [skip, setSkip] = useState(0);
    const [link, setLink] = useState();
    const [len, setLen] = useState();

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            pagination(`/api/pagination?slug=${slug}&skip=0`).then((items) => {
                setLink(items.data);
                setLen(items.len);
            });
        }

        return () => (mounted = false);
    }, [slug]);

    const loadMore = async () => {
        let toSkip = skip + 2;
        pagination(`/api/pagination?slug=${slug}&skip=${skip}`).then(
            (items) => {
                setLink([...link, ...items.data]);
                setSkip(toSkip);
            }
        );
    };

    const listOfLinks = () =>
        link?.map((item, index) => (
            <div key={index}>
                <Alert variant="primary">
                    <Alert.Heading>{item.title}</Alert.Heading>
                    <p>{item.url}</p>
                    <div className={styles.alert_bottom_flex}>
                        <>
                            {item.medium === 'Book' ? (
                                <p className={styles.alert_p}>Book</p>
                            ) : (
                                <p>Book/</p>
                            )}
                            {item.medium === 'Video' ? (
                                <p className={styles.alert_p}>Video</p>
                            ) : (
                                <p>/Video</p>
                            )}
                            {item.type === 'Free' ? (
                                <p
                                    style={{ marginLeft: '10px' }}
                                    className={styles.alert_p}
                                >
                                    Free
                                </p>
                            ) : (
                                <p style={{ marginLeft: '10px' }}>Free/</p>
                            )}
                            {item.type === 'Paid' ? (
                                <p className={styles.alert_p}>Paid</p>
                            ) : (
                                <p>/Paid</p>
                            )}
                            <p style={{ marginLeft: '10%' }}>
                                Created by {item.userName}
                            </p>
                        </>
                    </div>
                </Alert>
            </div>
        ));

    return (
        <div>
            <InfinteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={skip <= len}
                loader={
                    <Spinner animation="border" role="status" key={0}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
            >
                {listOfLinks() !== undefined ? (
                    listOfLinks()
                ) : (
                    <Spinner animation="border" role="status" key={0}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                )}
            </InfinteScroll>{' '}
        </div>
    );
};

export default Pagination;
