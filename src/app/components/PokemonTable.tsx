"use client";
import Link from "next/link";
import { PokemonProps } from "@/types";
import { Table, Button, Stack } from "react-bootstrap";

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
      <Table responsive striped className="pokemon-table">
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
      </Table>
    </div>
  );
}
