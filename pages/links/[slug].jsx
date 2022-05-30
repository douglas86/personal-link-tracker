import { useRouter } from 'next/router';

import SlugTemplate from '../../components/template/SlugTemplate.jsx';
import { GetRoute } from '../../API/index2.jsx';
import { spinner } from '../../components/atom/spinner.jsx';

const Links = () => {
    const router = useRouter();
    const { slug } = router.query;
    const fetcher = GetRoute(`/api/singleItem?slug=${slug}`).data;

    return (
        <>
            {slug === undefined ? (
                spinner()
            ) : (
                <SlugTemplate slug={slug} data={fetcher} />
            )}
        </>
    );
};

export default Links;
