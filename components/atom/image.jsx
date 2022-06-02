import Image from 'next/image';

export const image = (img, width, height) => {
    return (
        <>
            <Image src={img} alt="" width={width} height={height} />
        </>
    );
};
