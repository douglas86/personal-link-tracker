import { useEffect, useReducer } from "react";
import prisma from "../../../lib/prisma";

import { initialState } from "../../../Context/CreateLink/initialState";
import { reducer } from "../../../Context/CreateLink/reducer";

import styles from "../../../public/static/styles/create.module.css";
import CreateSidePanel from "../../../components/UI/organism/CreateSidePanel";

const Create = ({ results }) => {
  const categories = JSON.parse(results);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (categories && state.category.length === 0) {
      categories.map(({ title }) =>
        dispatch({
          type: "UPDATE",
          category: title,
        })
      );
    }
  }, [categories, state.category.length]);

  console.log("state1", state);

  return (
    <div className={styles.flex_container}>
      <div className={styles.flex_left}>
        <CreateSidePanel />
      </div>
      <div className={styles.flex_right}>
        <h1>Right</h1>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const Categories = await prisma.category.findMany();
  const results = JSON.stringify(Categories);

  return {
    props: { results },
  };
};

export default Create;

// const Create = (props) => {
//   const categories = JSON.parse(props.result);
//   const { state, setState, showCategories, showTypes, showMedium, showForm } =
//     createHelpers(categories);
//   const { message, showAlert, alertColor } = state;
//
//   const [screenSize, setScreenSize] = useState({
//     dynamicWidth: 0,
//   });
//
//   const setDimension = () => {
//     setScreenSize({
//       dynamicWidth: window.innerWidth,
//     });
//   };
//
//   useEffect(function mount() {
//     window.addEventListener("resize", setDimension);
//     return function unMount() {
//       window.removeEventListener("resize", setDimension);
//     };
//   });
//
//   useEffect(() => {
//     if (showAlert) {
//       setTimeout(() => {
//         setState({ ...state, showAlert: false });
//       }, 10000);
//     }
//   }, [setState, state, showAlert]);
//
//   return (
//     <Container>
//       <div className={styles.flex_container}>
//         <div className={styles.flex_left}>
//           <ul
//             style={{
//               maxHeight: "100px",
//               overflowY: "scroll",
//               listStyle: "none",
//               paddingLeft: 0,
//               width: screenSize.dynamicWidth < 800 ? "50%" : "200px",
//               margin:
//                 screenSize.dynamicWidth < 800 && screenSize.dynamicWidth > 0
//                   ? "1% 25%"
//                   : "0%",
//             }}
//           >
//             {showCategories()}
//           </ul>
//           <div className="form-group">
//             <label className="text-muted ml-4">Types</label>
//             {showTypes()}
//           </div>
//           <div className="form-group">
//             <label className="text-muted ml-4">Medium</label>
//             {showMedium()}
//           </div>
//         </div>
//         <div className={styles.flex_right}>
//           {showAlert ? (
//             <Alert variant={alertColor}>
//               <Alert.Heading>{message}</Alert.Heading>
//             </Alert>
//           ) : null}
//           {showForm()}
//         </div>
//       </div>
//     </Container>
//   );
// };
//
// export const getServerSideProps = async () => {
//   const Categories = await prisma.category.findMany();
//   const result = JSON.stringify(Categories);
//
//   return {
//     props: { result },
//   };
// };
//
// export default Create;
