import { Link } from "next/link";
import { connect } from "react-redux";
import Clock from "./Clock";
import AddCount from "./AddCount";

const Page = ({ title, tick }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={tick.lastUpdate} light={tick.light} />
      <AddCount />
    </div>
  );
};

export default connect((state) => state)(Page);
