import Image from 'next/image';

export const image = (img, width, height) => {
    return (
        <>
            <Image
                src={img}
                alt="no img to display"
                width={width}
                height={height}
            />
        </>
    );
};
