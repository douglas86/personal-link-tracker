import Image from "next/image";

export const img = (src, width, height) => (
  <Image src={src} alt="No image to display" width={width} height={height} />
);
