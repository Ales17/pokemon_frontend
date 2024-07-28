import { logout } from "../../lib";
import { redirect } from "next/navigation";
import Link from "next/link";
export const Navigation = ({ username }: { username: String }) => {
  return (
    <>
      <div className="navbar bg-primary text-primary-content">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/"}>Domů</Link>
              </li>
              <li>
                <Link href={"/pokemon/create"}>Nový Pokémon</Link>
              </li>
            </ul>
          </div>
          <span className="text-xl">Pokémon App</span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/"}>Domů</Link>
            </li>
            <li>
              <Link href={"/pokemon/create"}>Nový Pokémon</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <form
            action={async () => {
              "use server";
              await logout();
              redirect("/");
            }}
          >
            {username}
            <input
              className="btn btn-primary"
              type="submit"
              value={"Odhlásit"}
            />
          </form>
        </div>
      </div>
    </>
  );
};
