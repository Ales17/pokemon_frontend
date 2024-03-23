import Link from "next/link";
import { LinkProps } from "@/types";
export const MyLink = ({ href, name }: LinkProps) => {
  return (
    <>
      <Link href={href}>
        {name}
      </Link>
      <br />
    </>
  );
};
