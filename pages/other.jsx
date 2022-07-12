import { useEffect } from "react";
import { serverRenderClock, startClock } from "../Context/redux/tick/action";
import { addCount } from "../Context/redux/count/action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { wrapper } from "../Context/redux/store";
import Page from "../components/comp/Page";

const Other = (props) => {
  useEffect(() => {
    const timer = props.startClock();

    return () => {
      clearInterval(timer);
    };
  }, [props]);

  return <Page title="Other Page" linkTo="/" />;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => {
  store.dispatch(serverRenderClock(true));
  store.dispatch(addCount());
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Other);
