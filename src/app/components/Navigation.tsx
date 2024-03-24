import Link from "next/link";
import { LinkProps } from "@/types";

interface NavigationProps {
  links: LinkProps[];
  className: string;
}
export const Navigation = ({ links, className }: NavigationProps) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-2">
        {links.map((e, index) => {
          return <NavLink key={index} href={e.href} name={e.name} />;
        })}
      </ul>
    </nav>
  );
};

const NavLink = ({ href, name }: LinkProps) => {
  return (
    <li className="">
      <Link className="p-2 block border-solid border-2 rounded" href={href}>
        {name}
      </Link>
    </li>
  );
};
