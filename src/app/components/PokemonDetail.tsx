import Link from "next/link";
import { PokemonProps } from "@/types";

const PokemonDetail = ({ pokemon }: { pokemon: PokemonProps }) => {
    return (
      <div>
        <h2 className="text-2xl mb-4">Detail Pokémona</h2>
        <div className="card bg-base-100 md:w-96 shadow-xl">
          <figure>
            <img
              className="w-full"
              src="https://picsum.photos/400/300"
              alt={pokemon.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{pokemon.name}</h2>
            <p> {pokemon.type}</p>
            <div className="card-actions justify-end">
              <Link href={"/pokemon/" + pokemon.id + "/edit"}>
                <button className="btn btn-warning">Upravit</button>
              </Link>
              <Link href={"/pokemon/" + pokemon.id + "/reviews/create"}>
                <button className="btn btn-secondary">Hodnotit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default PokemonDetail