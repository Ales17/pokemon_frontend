"use client";
import { useEffect, useState } from "react";
import instance from "../../config/axios";
import { PokemonProps } from "@/types";
import PokemonTable from "../components/PokemonTable";

export default function Page() {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();
  const [isDomLoaded, setIsDomLoaded] = useState<boolean>(true);
  // empty argument - only on first render

  useEffect(() => {
    loadDataFromApi();
    setIsDomLoaded(true);
  }, []);

  const loadDataFromApi = () => {
    instance
      .get("pokemon")
      .then((response) => {
        if (response.status == 200) setPokemons(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePokemonDelete = (pokemonId: number) => {
    instance
      .delete(`pokemon/${pokemonId}/delete`)
      .then((response) => {
        if (response.status == 200)
          setPokemons(pokemons?.filter((e) => e.id !== pokemonId));
        console.log("Pokemon deleted.");
      })
      .catch((error) => console.log(error));
  };

  const LoadingMessage = ({ message }: { message: String }) => {
    return <div className="text-2xl">{message}</div>;
  };

  return (
    <div>
      {pokemons ? (
        <PokemonTable
          deleteFunction={(id: number) => handlePokemonDelete(id)}
          pokemons={pokemons}
        />
      ) : (
        <LoadingMessage message={"Načítám Pokémony..."} />
      )}
    </div>
  );
}
