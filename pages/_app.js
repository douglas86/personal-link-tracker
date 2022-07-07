import Layout from "../components/template/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import Auth from "../Context/Auth";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Layout>
          <Auth>
            <Component {...pageProps} />
          </Auth>
        </Layout>
      </SessionProvider>
    </>
  );
}

export default MyApp;
