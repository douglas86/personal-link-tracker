import Link from 'next/link';
import { Nav } from 'react-bootstrap';

export const dashboard_links = () => {
    return (
        <>
            <Link href="/dashboard" passHref>
                <Nav.Link>Dashboard</Nav.Link>
            </Link>
        </>
    );
};

export const submit_links = () => {
    return (
        <>
            <Link href="/user/link/create" passHref>
                <Nav.Link>Submit a Link</Nav.Link>
            </Link>
        </>
    );
};
