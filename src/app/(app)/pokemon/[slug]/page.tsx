"use client";
import { useParams } from "next/navigation";
import instance from "@/config/axios";
import { useEffect, useState } from "react";
import { ReviewProps, PokemonProps } from "@/types";
import Link from "next/link";
const defaultPokemon = { id: -999, name: "", type: "" };

export default function Page() {
  let [pokemon, setPokemon] = useState(defaultPokemon);
  let [reviews, setReviews] = useState<ReviewProps[]>();
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

  const PokemonReviews = ({ reviews }: { reviews: ReviewProps[] }) => {
    return (
      <div>
        <h2>Recenze Pokémona</h2>
        <div>
          {reviews.map((e, index) => (
            <PokemonReview key={index} review={e} />
          ))}
        </div>
      </div>
    );
  };

  const PokemonReview = ({ review }: { review: ReviewProps }) => {
    return (
      <>
        {review.title}
        <span title="Hodnocení (počet hvězdiček)">&#9733; {review.stars}</span>
        <span title="Autor">By {review.createdBy.username}</span>
        {review.content}
        <button onClick={() => handleReviewDelete(review.id)}>Vymazat</button>
        <a href={`/pokemon/${slug}/reviews/${review.id}/edit`}>Upravit</a>
      </>
    );
  };

  const PokemonDetail = ({ pokemon }: { pokemon: PokemonProps }) => {
    return (
      <>
        {" "}
        <div>
          <h2>{pokemon.name}</h2>
          {pokemon.type}
        </div>
        <Link href={"/pokemon/" + slug + "/edit"}>
          <button>Upravit</button>
        </Link>
        <Link href={"/pokemon/" + slug + "/reviews/create"}>
          <button>Hodnotit</button>
        </Link>
        <img src="https://picsum.photos/400/300" alt={pokemon.name} />
      </>
    );
  };

  return (
    <>
      {error && <div>Pokémon nenalezen</div>}
      {pokemon.id != -999 && <PokemonDetail pokemon={pokemon} />}
      {pokemon.id != -999 && reviews && <PokemonReviews reviews={reviews} />}
    </>
  );
}
