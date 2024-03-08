import { useEffect, useState, FormEvent } from "react";
import { instance as axios } from "@/config/axiosConfig";
export interface PokemonProps {
  id: string;
  name: string;
  type: string;
}

interface PokemonFormProps {
  pokemonToUpdate?: PokemonProps;
}

const PokemonForm = ({ pokemonToUpdate }: PokemonFormProps) => {
  const [pokemon, setPokemon] = useState({ id: "", name: "", type: "" });

  useEffect(() => {
    if (pokemonToUpdate) setPokemon(pokemonToUpdate);
  }, [pokemonToUpdate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    if (pokemonToUpdate) {
      axios
        .put(`pokemon/${pokemon.id}/update`, {
          name: pokemon.name,
          type: pokemon.type,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`pokemon/create`, pokemon)
        .then((response) => {
          console.log(response);
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
        <input
          type="submit"
          value="Uložit"
          className="bg-cyan-950 text-white p-3 rounded-xl cursor-pointer "
        />
      </form>
    </>
  );
};

export default PokemonForm;
