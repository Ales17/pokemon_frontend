"use client";
import { useEffect, useState } from "react";
import instance from "../../config/axios";
import { PokemonProps } from "@/types";
import PokemonTable from "../components/PokemonTable";
import { Alert } from "react-bootstrap";
import { getPokemons } from "../api/pokemonData";

export default function Page() {
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();

  useEffect(() => {
    const fetchPokemonsData = async () => {
      const pokemonsData = await getPokemons();
      setPokemons(pokemonsData.content);
    };

    fetchPokemonsData();
  }, []);

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
