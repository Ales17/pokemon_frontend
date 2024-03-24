"use client";
import { useParams } from "next/navigation";
import instance from "@/config/axios";
import { useEffect, useState } from "react";
import { ReviewProps } from "@/types";
const defaultPokemon = { id: 0, name: "", type: "" };

export default function Page() {
  let [pokemon, setPokemon] = useState(defaultPokemon);
  let [reviews, setReviews] = useState<ReviewProps[]>();
  const { slug } = useParams();

  useEffect(() => {
    instance
      .get(`pokemon/${slug}`, {})
      .then(function (response) {
        if (response.status != 200) {
          alert("Chyba při načítání Pokémonů");
        } else {
          setPokemon(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getReviews = () => {
    instance
      .get(`pokemon/${slug}/reviews`)
      .then((response) => {
        console.log(response.data);

        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleReviewDelete = (reviewId: Number) => {
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

  const PokemonReview = ({ review }: { review: ReviewProps }) => {
    return (
      <div>
        <h2>{review.title}</h2>
        <div>{review.content}</div>
        <div>Hvězdičky {review.stars}</div>
        <button onClick={(e) => handleReviewDelete(review.id)}>Vymazat</button>
      </div>
    );
  };

  return (
    <>
      <h2>DETAIL POKÉMONA</h2>
      {pokemon && <p>{pokemon.name}</p>}
      <p>{pokemon.type}</p>
      {reviews && reviews.map((e, index) => <PokemonReview key={index} review={e} />)}
    </>
  );
}
