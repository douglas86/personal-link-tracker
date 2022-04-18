import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Container } from 'react-bootstrap';

import styles from './styles/index.module.css';

const Subscriber = () => {
    const { data: session } = useSession();

    return (
        <div>
            <Container>
                <h1 className={styles.heading}>
                    This is {session.user.name}'s Dashboard
                </h1>
                <hr />
                <div className={styles.flexbox}>
                    <div className={styles.leftSide}>
                        <Link href="/user/link/create" passHref>
                            <a>Submit a link</a>
                        </Link>
                        <br />
                        <Link href="/user/profile/update" passHref>
                            <a>Update a profile</a>
                        </Link>
                    </div>
                    <div className={styles.rightSide}>
                        <h1>This is the right</h1>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Subscriber;
