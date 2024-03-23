"use client";

import { useEffect, useState } from "react";
import instance from "./axiosConfig";
import Link from "next/link";
import { PokemonProps } from "@/types";

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();

  useEffect(() => {
    loadDataFromApi();
  }, [pokemons]);

  const loadDataFromApi = () => {
    instance
      .get("pokemon")
      .then((response) => {
        if (response.status !== 200) {
          alert("Nepodařilo se načíst Pokémony");
        } else {
          setPokemons(response.data.content);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePokemonDelete = (pokemonId: Number) => {
    instance
      .delete(`pokemon/${pokemonId}/delete`)
      .then((response) => {
        loadDataFromApi();
        if (response.status == 200) {
          alert("Pokémon byl vymazán úspěšně.");
        }
      })
      .catch((error) => console.log(error));
  };

  function PokemonRow({ pokemon }: { pokemon: PokemonProps }) {
    return (
      <tr>
        <td>{pokemon.name}</td>
        <td>{pokemon.type}</td>
        <td>
          <Link href={`/pokemon/${pokemon.id}`}>Detail</Link>
        </td>
        <td>
          <Link href={`/pokemon/${pokemon.id}/edit`}>Upravit</Link>
        </td>
        <td>
          <button onClick={() => handlePokemonDelete(pokemon.id)}>
            Vymazat
          </button>
        </td>
      </tr>
    );
  }

  function PokemonTable({ pokemons }: { pokemons: PokemonProps[] }) {
    return (
      <table>
        <thead>
          <tr>
            <th>Jméno</th>
            <th>Druh</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonRow key={e.id} pokemon={e} />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h1>Domů</h1>
      {pokemons && <PokemonTable pokemons={pokemons} />}
    </>
  );
}
