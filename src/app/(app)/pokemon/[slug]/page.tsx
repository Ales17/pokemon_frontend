"use client";
import { useParams } from "next/navigation";
import instance from "@/config/axios";
import { useEffect, useState } from "react";
import { ReviewProps, PokemonProps } from "@/types";
import Link from "next/link";
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

  const Pokemon = ({ pokemon }: { pokemon: PokemonProps }) => {
    return (
      <div className="flex flex-col gap-2 md:flex-row md:justify-around">
        <div className="flex flex-col gap-8 md:w-2/3">
          <div>
            <h2 className="text-2xl ">{pokemon.name}</h2>
            {pokemon.type}
          </div>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            architecto nisi qui. Exercitationem cupiditate ducimus dicta vitae.{" "}
          </div>
          <div>
            <Link href={"/pokemon/" + slug + "/edit"}>
              <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Upravit
              </button>
            </Link>
          </div>
        </div>
        <img
          className="rounded md:w-1/3"
          src="https://picsum.photos/250"
          alt={pokemon.name}
        />
      </div>
    );
  };

  return (
    <>
      {pokemon && <Pokemon pokemon={pokemon} />}
      {reviews &&
        reviews.map((e, index) => <PokemonReview key={index} review={e} />)}
    </>
  );
}
