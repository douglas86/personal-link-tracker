import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";

import Layout from "../components/UI/template/Layout";

import { Provider } from "../Context/Store";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
