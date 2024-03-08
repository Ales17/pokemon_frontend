"use client";

import { useEffect, useState } from "react";
import instance from "../config/axiosConfig";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Router from "next/router";

export default function Home() {
  interface PokemonProps {
    id: any;
    name: string;
    type: string;
  }
  const router = useRouter();
  const [jwt, setJwt] = useState<string | null>();
  useEffect(() => {
    if (!localStorage.getItem("usr")) {
      router.push("/login");
    } else {
      setJwt(localStorage.getItem("usr"));
    }
  }, []);

  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();

  useEffect(() => {
    loadDataFromApi();
  }, []);

  const loadDataFromApi = () => {
    instance
      .get("pokemon", {
        //headers: { Authorization: `Bearer ${jwt}` },
        params: { pageSize: 500 },
      })
      .then((response) => {
        setPokemons(response.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePokemonDelete = (pokemonId: Number) => {
    instance
      .delete(`pokemon/${pokemonId}/delete`)
      .then((response) => {
        console.log(response.status);

        loadDataFromApi();

        //window.location.reload();
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
