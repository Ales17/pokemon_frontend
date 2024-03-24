"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import instance from "@/config/axios";
import PokemonForm from "@/app/components/PokemonForm";
export default function Page() {
  const { slug } = useParams();

  const [pokemon, setPokemon] = useState({ id: "", name: "", type: "" });

  useEffect(() => {
    instance
      .get(`pokemon/${slug}`)
      .then(function (response) {
        console.log(response.data);
        setPokemon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <PokemonForm pokemonToUpdate={pokemon}></PokemonForm>
    </div>
  );
}
