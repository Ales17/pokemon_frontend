"use client";
import { useEffect, useState } from "react";
import instance from "../../config/axios";
import { PokemonProps } from "@/types";
import PokemonTable from "../components/PokemonTable";
import { Alert } from "react-bootstrap";
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

  return (
    <div>
      <h1>Seznam Pokémonů</h1>
      {pokemons ? (
        <PokemonTable
          deleteFunction={(id: number) => handlePokemonDelete(id)}
          pokemons={pokemons}
        />
      ) : (
        <Alert variant="primary">Načítám Pokemony</Alert>
      )}
    </div>
  );
}
