import Layout from '../components/Layout.jsx';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from 'next-auth/react';
import { HomeProvider } from '../Context/HomeContext';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <HomeProvider>
            <Component {...pageProps} />
          </HomeProvider>
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
