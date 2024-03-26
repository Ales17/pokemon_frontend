import Link from "next/link";
import { LinkProps } from "@/types";

interface NavigationProps {
  items: LinkProps[];
  className?: string;
}
export const Navigation = ({ items: links, className }: NavigationProps) => {
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-2 text-center md:flex-row">
        {links.map((e, index) => {
          return <NavLink key={index} href={e.href} name={e.name} />;
        })}
      </ul>
    </nav>
  );
};

const NavLink = ({ href, name }: LinkProps) => {
  return (
    <li>
      <Link
        className="block md:flex bg-blue-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 rounded"
        href={href}
      >
        {name}
      </Link>
    </li>
  );
};
