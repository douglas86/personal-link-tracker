import Image from 'next/image';

export const img = (src, width, height) => {
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
