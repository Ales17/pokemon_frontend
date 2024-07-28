"use client";
import Link from "next/link";
import { PokemonProps } from "@/types";

function PokemonTableRow({
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
      <td className="flex gap-2">
        <Link href={`/pokemon/${pokemon.id}`}>
          <button className="btn btn-sm btn-primary">Detail</button>
        </Link>

        <Link href={`/pokemon/${pokemon.id}/edit`}>
          <button className="btn btn-sm btn-warning">Upravit</button>
        </Link>

        <button
          className="btn btn-sm btn-error"
          onClick={() => deleteFunction(pokemon.id)}
        >
          Vymazat
        </button>
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
      <table className="pokemon-table table">
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Druh</th>
            <th>Operace</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonTableRow
              deleteFunction={deleteFunction}
              key={e.id}
              pokemon={e}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
