"use client";
import { useParams } from "next/navigation";
import instance from "@/app/axios";
import { useEffect, useState } from "react";
import { ReviewProps, PokemonProps } from "@/types";
import Link from "next/link";
const defaultPokemon = { id: -999, name: "", type: "" };

export default function Page() {
  let [pokemon, setPokemon] = useState(defaultPokemon);
  let [reviews, setReviews] = useState(null);
  let [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    instance
      .get(`pokemon/${slug}`, {})
      .then(function (response) {
        console.log(response.status);
        setPokemon(response.data);
        getReviews();
      })
      .catch(function (error) {
        setError(true);
      });
  }, []);

  const getReviews = () => {
    if (pokemon) {
      instance
        .get(`pokemon/${slug}/reviews`)
        .then((response) => {
          console.log(response.data);

          setReviews(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleReviewDelete = (reviewId: number) => {
    instance
      .delete(`pokemon/${pokemon.id}/reviews/${reviewId}`)
      .then((response) => {
        console.log(response);
        getReviews();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const PokemonReviews = ({ reviews }: { reviews: ReviewProps[] | null }) => {
    return (
      <div className="grow">
        <h2 className="text-2xl mb-4">Hodnocení</h2>
        <div className="flex flex-col gap-2">
          {reviews === null && <div>Pokémon nemá žádná hodnocení</div>}
          {reviews !== null &&
            reviews.map((e, index) => <PokemonReview key={index} review={e} />)}
        </div>
      </div>
    );
  };

  const PokemonReview = ({ review }: { review: ReviewProps }) => {
    return (
      <>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{review.title}</h2>
            <p>
              {review.content} <br></br>
              {review.createdBy.username} <br></br>
              <span title="Hodnocení (počet hvězdiček)">
                &#9733; {review.stars}
              </span>
            </p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleReviewDelete(review.id)}
                className="btn btn-error"
              >
                Vymazat
              </button>
              <Link href={`/pokemon/${slug}/reviews/${review.id}/edit`}>
                <button className="btn btn-secondary">Upravit</button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

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
              <Link href={"/pokemon/" + slug + "/edit"}>
                <button className="btn btn-warning">Upravit</button>
              </Link>
              <Link href={"/pokemon/" + slug + "/reviews/create"}>
                <button className="btn btn-secondary">Hodnotit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return <div>Pokémon nenalezen</div>;
  }
  if (pokemon.id != -999)
    return (
      <div className="flex flex-col md:flex-row gap-2">
        {<PokemonDetail pokemon={pokemon} />}
        {<PokemonReviews reviews={reviews} />}
      </div>
    );
}
