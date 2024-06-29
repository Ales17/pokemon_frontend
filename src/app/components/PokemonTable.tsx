"use client";
import Link from "next/link";
import { PokemonProps } from "@/types";
import { Table, Button, Stack } from "react-bootstrap";
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
  deleteFunction,
}: {
  pokemon: PokemonProps;
  deleteFunction: (id: number) => void;
}) {
  return (
    <tr>
      <td>{pokemon.name}</td>
      <td>{pokemon.type}</td>
      <td>
        <Stack direction="horizontal" gap={3}>
          <Button href={`/pokemon/${pokemon.id}`}>Detail</Button>
          <Button variant="warning" href={`/pokemon/${pokemon.id}/edit`}>
            Upravit
          </Button>
          <Button variant="danger" onClick={() => deleteFunction(pokemon.id)}>
            Vymazat
          </Button>
        </Stack>
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
  return (
    <div>
      <Table striped className="pokemon-table">
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Druh</th>
            <th>Operace</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonRow
              deleteFunction={deleteFunction}
              key={e.id}
              pokemon={e}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
