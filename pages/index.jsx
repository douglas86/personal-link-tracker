import { GetRoute } from "../API/index";
import { displayCategory } from "../components/molecule/displayCategory";

import styles from "../public/static/styles/index.module.css";
import { serverRenderClock, startClock } from "../Context/redux/tick/action";
import { addCount } from "../Context/redux/count/action";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { wrapper } from "../Context/redux/store";
import { useEffect } from "react";
import Page from "../components/comp/Page";

const Home = (props) => {
  const fetcher = GetRoute("/api/category").data;

  useEffect(() => {
    const timer = props.startClock();

    return () => {
      clearInterval(timer);
    };
  }, [props]);

  return (
    <div>
      <Page title="Index Page" linkTo="/other" />
      <h1 className={styles.title}>Browse Tutorial/Courses</h1>
      <div className={styles.flex}>
        {fetcher !== undefined
          ? Object.entries(fetcher).map(([key, value]) => (
              <div key={key}>{displayCategory(value)}</div>
            ))
          : null}
      </div>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps((store) => {
  store.dispatch(serverRenderClock(true));
  store.dispatch(addCount());
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Home);
