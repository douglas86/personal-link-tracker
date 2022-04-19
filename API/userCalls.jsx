import axios from 'axios';
import useSWR from 'swr';

const Apis = () => {
    // read;
    const Fetcher = () => {
        const fetcher = (url) => fetch(url).then((res) => res.json());
        const { data } = useSWR('/api/pagination', fetcher, {
            revalidateOnFocus: false,
        });
        return data;
    };

    return { Fetcher };
};

export default Apis;
