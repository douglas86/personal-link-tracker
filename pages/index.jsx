import useSWR from "swr";
import Link from "next/link";

const Home = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/AWS/s3", fetcher);

  console.log("data", data);

  const listCategories =
    data !== undefined
      ? Object.entries(data.data).map(([k, v]) => (
          <Link href="/" key={k} passHref>
            <a
              className="bg-light p-3 col-md-4"
              href=""
              style={{ border: "1px solid red", margin: "1px 25%" }}
            >
              <div>
                <div className="row">
                  <div className="col-md-4">
                    <img
                      className="pr-3"
                      src={`data:image/jpeg;base64,${v.Body}`}
                      style={{ width: "80px", height: "auto" }}
                      alt={v.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <h3>{v.name}</h3>
                    <p>{v.description}</p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))
      : null;

  return (
    <div>
      <h1>This is the home page</h1>
      <div className="row">{listCategories}</div>
    </div>
  );
};

export default Home;
