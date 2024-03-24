import { useEffect, useState, FormEvent } from "react";
import instance from "@/config/axios";
import { PokemonProps, PokemonFormProps } from "@/types";
import { useRouter } from "next/navigation";
const PokemonForm = ({ pokemonToUpdate }: PokemonFormProps) => {
  const [pokemon, setPokemon] = useState({ id: "", name: "", type: "" });
  const router = useRouter();
  useEffect(() => {
    if (pokemonToUpdate) setPokemon(pokemonToUpdate);
  }, [pokemonToUpdate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    if (pokemonToUpdate) {
      instance
        .put(`pokemon/${pokemon.id}/update`, {
          name: pokemon.name,
          type: pokemon.type,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            router.push("/pokemon/" + response.data.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      instance
        .post(`pokemon/create`, pokemon)
        .then((response) => {
          console.log(response);
          if (response.status == 201) {
            router.push("/pokemon/" + response.data.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="border-solid border-2 p-3"
          type="text"
          onChange={(e) =>
            setPokemon({
              ...pokemon,
              name: e.target.value,
            })
          }
          value={pokemon.name}
        />
        <input
          className="border-solid border-2 p-3"
          type="text"
          onChange={(e) =>
            setPokemon({
              ...pokemon,
              type: e.target.value,
            })
          }
          value={pokemon.type}
        />
        <input type="submit" value="Uložit" className="" />
      </form>
    </>
  );
};

export default PokemonForm;
