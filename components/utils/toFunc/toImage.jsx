import Image from "next/image";

export const toImage = (src, width, height) => (
  <Image
    src={src}
    alt="no image to display"
    width={width}
    height={height}
  />
)

