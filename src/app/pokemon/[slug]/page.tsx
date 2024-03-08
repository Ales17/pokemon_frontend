"use client";
import { useParams } from "next/navigation";
import instance from "@/config/axiosConfig";
import { useEffect, useState } from "react";
import { get } from "http";
const Pokemon = () => {
  let [pokemon, setPokemon] = useState({ id: 0, name: "", type: "" });
  let [reviews, setReviews] = useState<ReviewProps[]>();
  const { slug } = useParams();

  interface ReviewProps {
    id: Number;
    title: string;
    content: string;
    stars: any;
  }

  interface PokemonProps {
    id: Number;
    name: string;
    type: string;
  }

  useEffect(() => {
    instance
      .get(`pokemon/${slug}`, {
        //headers: { Authorization: `Bearer ${jwt}` },
      })
      .then(function (response) {
        console.log(response.data);

        setPokemon(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    instance
      .get(`pokemon/${slug}/reviews`, {
        //headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        console.log(response.data);

        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getReviews = () => {
    instance
      .get(`pokemon/${slug}/reviews`, {
        //headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        console.log(response.data);

        setReviews(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  useEffect(() => console.log(reviews), []);

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

  const Review = ({ review }: { review: ReviewProps }) => {
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
      {pokemon && <p>{pokemon.name}</p>}
      <p>{pokemon.type}</p>
      {reviews && reviews.map((e) => <Review key={e.id} review={e} />)}
    </>
  );
};

export default Pokemon;
