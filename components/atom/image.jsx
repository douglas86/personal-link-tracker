import Image from 'next/image';

export const image = (src, width, height) => {
    return (
        <>
            <Image
                src={src}
                alt="no image to display"
                width={width}
                height={height}
            />
        </>
    );
};
