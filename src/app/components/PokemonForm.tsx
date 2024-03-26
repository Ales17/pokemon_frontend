import { useEffect, useState, FormEvent } from "react";
import instance from "@/config/axios";
import { PokemonFormProps } from "@/types";
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
          if (response.status === 200) {
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
          if (response.status === 201) {
            router.push("/pokemon/" + response.data.id);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const inputClass =
    "border-0 border-b border-blue-500 w-full py-2 px-3 text-gray-700";

  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-4">
          <label className={labelClass} htmlFor="name">
            Jméno
          </label>
          <input
            name="name"
            className={inputClass}
            type="text"
            onChange={(e) =>
              setPokemon({
                ...pokemon,
                name: e.target.value,
              })
            }
            value={pokemon.name}
          />
        </div>
        <div className="mb-6">
          <label className={labelClass} htmlFor="name">
            Druh
          </label>
          <input
            className={inputClass}
            type="text"
            onChange={(e) =>
              setPokemon({
                ...pokemon,
                type: e.target.value,
              })
            }
            value={pokemon.type}
          />
        </div>
        <div className="flex">
          <input
            type="submit"
            value="Uložit"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          />
        </div>
      </form>
    </>
  );
};

export default PokemonForm;
