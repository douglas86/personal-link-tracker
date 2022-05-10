import Layout from '../components/Layout.jsx';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-quill/dist/quill.bubble.css';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
