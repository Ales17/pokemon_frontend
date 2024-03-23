"use client";
import { useEffect, useState } from "react";
import instance from "./axiosConfig";
import { MyLink } from "./components/MyLink";
import { PokemonProps } from "@/types";

export default function Page() {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();

  // empty argument - only on first render
  useEffect(() => {
    loadDataFromApi();
  }, []);

  const loadDataFromApi = () => {
    instance
      .get("pokemon")
      .then((response) => {
        setPokemons(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePokemonDelete = (pokemonId: Number) => {
    console.log("Handle P delete");
    instance
      .delete(`pokemon/${pokemonId}/delete`)
      .then((response) => {
        alert("Pokémon byl vymazán úspěšně.");
        setPokemons(pokemons?.filter((e) => e.id !== pokemonId));
      })
      .catch((error) => console.log(error));
  };

  function PokemonRow({ pokemon }: { pokemon: PokemonProps }) {
    return (
      <tr>
        <td>{pokemon.name}</td>
        <td>{pokemon.type}</td>
        <td>
          <MyLink href={`/pokemon/${pokemon.id}`} name={"Detail"} />
        </td>
        <td>
          <MyLink href={`/pokemon/${pokemon.id}/edit`} name={"Upravit"} />
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
