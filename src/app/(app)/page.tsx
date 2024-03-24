"use client";
import { useEffect, useState } from "react";
import instance from "../../config/axios";
import { MyLink } from "../components/MyLink";
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

  function PokemonRow({
    pokemon,
    className,
  }: {
    pokemon: PokemonProps;
    className: string;
  }) {
    return (
      <tr>
        <td className={className}>{pokemon.name}</td>
        <td className={className}>{pokemon.type}</td>
        <td className={className + " flex"}>
          <div className="flex gap-2">
            <MyLink href={`/pokemon/${pokemon.id}`} name={"Detail"} />
            <MyLink href={`/pokemon/${pokemon.id}/edit`} name={"Upravit"} />
            <button onClick={() => handlePokemonDelete(pokemon.id)}>
              Vymazat
            </button>
          </div>
        </td>
      </tr>
    );
  }

  function PokemonTable({ pokemons }: { pokemons: PokemonProps[] }) {
    const cellClassName = "p-2 border border border-slate-400";
    return (
      <table className=" border-collapse table-auto border border-slate-400">
        <thead>
          <tr>
            <th className={cellClassName}>Jméno</th>
            <th className={cellClassName}>Druh</th>
            <th className={cellClassName}>Operace</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonRow className={cellClassName} key={e.id} pokemon={e} />
          ))}
        </tbody>
      </table>
    );
  }

  return <>{pokemons && <PokemonTable pokemons={pokemons} />}</>;
}
