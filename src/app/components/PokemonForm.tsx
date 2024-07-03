import { useEffect, useState, FormEvent } from "react";
import instance from "@/config/axios";
import { Form, Button, Alert } from "react-bootstrap";
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
      {error && <Alert variant="danger">Chyba při uložení</Alert>}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Jméno</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              setPokemon({
                ...pokemon,
                name: e.target.value,
              })
            }
            value={pokemon.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Druh</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) =>
              setPokemon({
                ...pokemon,
                type: e.target.value,
              })
            }
            value={pokemon.type}
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="primary">
            Uložit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default PokemonForm;
