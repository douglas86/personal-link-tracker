import { mapToLinks } from '../molecule/mapToLinks';

export const Cards = (url, src, width, height, title) => {
    return <>{mapToLinks(url, src, width, height, title)}</>;
};
