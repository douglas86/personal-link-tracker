import useSWR from "swr";
import styles from "../public/styles/index.module.css";

const Home = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data } = useSWR("/api/AWS/s3", fetcher);

  return (
    <div>
      <h1 className={styles.title}>Browse Tutorial/Courses</h1>
      <div className={styles.flex_container}>
        {data !== undefined
          ? Object.entries(data.contents).map(([k, v]) => (
              <button key={k} className={styles.button}>
                <div className={styles.contents}>
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
              </button>
            ))
          : null}
      </div>
    </div>
  );
};

export default Home;
