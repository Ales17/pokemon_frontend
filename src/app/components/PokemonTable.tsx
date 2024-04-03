import Link from "next/link";
import { PokemonProps } from "@/types";

function PokemonTableButton({
  href,
  name,
  onClick,
  colorClass,
}: {
  href?: string;
  name: string;
  onClick?: () => void;
  colorClass?: string;
}) {
  const additionalClass = colorClass
    ? colorClass
    : " bg-blue-500 hover:bg-blue-700 ";
  const className =
    additionalClass +
    "text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
  if (href) {
    return (
      <Link className={className} href={href}>
        {name}
      </Link>
    );
  } else if (onClick) {
    return (
      <button className={className} onClick={onClick}>
        {name}
      </button>
    );
  }
}

function PokemonRow({
  pokemon,
  tdClass,
  trClass,
  deleteFunction,
}: {
  pokemon: PokemonProps;
  tdClass: string;
  trClass: string;
  deleteFunction: (id: number) => void;
}) {
  return (
    <tr className={trClass}>
      <td className={tdClass}>{pokemon.name}</td>
      <td className={tdClass}>{pokemon.type}</td>
      <td className={tdClass + " flex gap-2 justify-center"}>
        <PokemonTableButton href={`/pokemon/${pokemon.id}`} name={"Detail"} />
        <PokemonTableButton
          href={`/pokemon/${pokemon.id}/edit`}
          name={"Upravit"}
        />
        <PokemonTableButton
          onClick={() => deleteFunction(pokemon.id)}
          name="Vymazat"
          colorClass="bg-red-500 hover:bg-red-700 "
        />
      </td>
    </tr>
  );
}

export default function PokemonTable({
  pokemons,
  deleteFunction,
}: {
  pokemons: PokemonProps[];
  deleteFunction: (id: number) => void;
}) {
  const cellClassName = "p-3";
  const trClassName = "p-3 border-b border-blue-500 hover:bg-sky-100";
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto ">
        <thead>
          <tr className={"p-3 border-b border-blue-500"}>
            <th className={cellClassName}>Jméno</th>
            <th className={cellClassName}>Druh</th>
            <th className={cellClassName}>Operace</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonRow
              deleteFunction={deleteFunction}
              tdClass={cellClassName}
              trClass={trClassName}
              key={e.id}
              pokemon={e}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
