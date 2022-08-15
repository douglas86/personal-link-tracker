import { useEffect, useState } from "react";

const useFetch = (url, options=null) => {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch("/api" + url, options)
      .then(async (res) => await res.json())
      .then((data) => setData(data))
  }, [url, options])
  return data
}

export default useFetch