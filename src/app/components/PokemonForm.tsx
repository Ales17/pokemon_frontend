import { useEffect, useState, FormEvent } from "react";
import instance from "../axios";
import { PokemonFormProps } from "@/types";
import { useRouter } from "next/navigation";
const PokemonForm = ({ pokemonToUpdate }: PokemonFormProps) => {
  const [pokemon, setPokemon] = useState({ id: "", name: "", type: "" });
  const [error, setError] = useState(false);
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
          //console.log(error);
          setError(true);
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
          setError(true);
          //console.log(error);
        });
    }
  };

  return (
    <>
      {error && <div>Chyba při uložení</div>}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <label>Jméno</label>
          <input
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
        <div className="mb-3">
          <label>Druh</label>
          <input
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
        <div>
          <button type="submit">Uložit</button>
        </div>
      </form>
    </>
  );
};

export default PokemonForm;
