import useSWR from "swr";
import Link from "next/link";
// import { s3 } from "../lib/s3Client";
// import prisma from "../lib/prisma.js";

const Home = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/AWS/s3", fetcher);

  console.log("data", data);

  const listCategories =
    data !== undefined
      ? Object.entries(data.contents).map(([k, v]) => (
          <div
            className="bg-light p-3 col-md-4"
            style={{ border: "1px solid red", margin: "1px 25%" }}
            key={k}
          >
            <div className="row">
              <div className="col-md-4">
                <img
                  className="pr-3"
                  src={`data:image/jpeg;base64,${v.image}`}
                  style={{ width: "80px", height: "auto" }}
                  alt={v.title}
                />
              </div>
            </div>
            <div className="col-md-8">
              <h1>{v.title}</h1>
            </div>
          </div>
        ))
      : null;

  // const listCategories =
  //   data !== undefined
  //     ? Object.entries(data.contents).map(([k, v], i) => (
  //         <div key={k}>
  //           <Link href={`/${i}`} key={k} passHref>
  //             {console.log("Body", v)}
  //             <a
  //               className="bg-light p-3 col-md-4"
  //               href=""
  //               style={{ border: "1px solid red", margin: "1px 25%" }}
  //             >
  //               <div>
  //                 <div className="row">
  //                   <div className="col-md-4">
  //                     <img
  //                       className="pr-3"
  //                       src={`data:image/jpeg;base64,${v.image}`}
  //                       style={{ width: "80px", height: "auto" }}
  //                       alt={v.title}
  //                     />
  //                   </div>
  //                   <div className="col-md-8">
  //                     <h3>{v.title}</h3>
  //                   </div>
  //                 </div>
  //               </div>
  //             </a>
  //           </Link>
  //         </div>
  //       ))
  //     : null;

  return (
    <div>
      <h1>This is the home page</h1>
      <div>{listCategories}</div>
    </div>
  );
};

export default Home;
