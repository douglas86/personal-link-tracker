import Link from "next/link";

export const links = (url, description) => {
  return (
    <>
      <Link href={url} passHref>
        {description}
      </Link>
    </>
  );
};
