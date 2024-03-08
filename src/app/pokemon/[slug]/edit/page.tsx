"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { instance as axios } from "@/config/axiosConfig";
import PokemonForm from "@/app/components/PokemonForm";
const Page = () => {
  const { slug } = useParams();

  const [pokemon, setPokemon] = useState({ id: "", name: "", type: "" });

  useEffect(() => {
    axios
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
};

export default Page;
