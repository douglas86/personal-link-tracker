import useSWR from "swr";
import styles from "../public/styles/index.module.css";

const Home = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/AWS/s3", fetcher);

  console.log("data", data);

  return (
    <div>
      <h1 className={styles.title}>Different types of categories</h1>
      <div className={styles.flex_container}>
        {data !== undefined
          ? Object.entries(data.contents).map(([k, v]) => (
              <div key={k} className={styles.contents}>
                <div className={styles.flex_image}>
                  <img
                    className={styles.image}
                    src={`data:image/jpeg;base64,${v.image}`}
                    alt={v.title}
                  />
                </div>
                <div className={styles.title}>
                  <h5>{v.title}</h5>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
