import Navbar from '../Navbar.jsx';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
