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
      <td>
        <a href={`/pokemon/${pokemon.id}`}>Detail</a>
        <a href={`/pokemon/${pokemon.id}/edit`}>Upravit</a>
        <button onClick={() => deleteFunction(pokemon.id)}>Vymazat</button>
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
      <table className="pokemon-table">
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
