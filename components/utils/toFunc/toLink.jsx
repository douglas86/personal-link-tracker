import Link from "next/link";

export const toLink = (link, description) => (
  <Link href={link} passHref>
    {description}
  </Link>
);
