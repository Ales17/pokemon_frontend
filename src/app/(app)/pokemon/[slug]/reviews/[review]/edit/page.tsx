"use client";
import { useParams } from "next/navigation";
import instance from "@/app/axios";
import { useEffect, useState } from "react";
import ReviewForm from "@/app/components/ReviewForm";
import { ReviewProps } from "@/types";
export default function Page() {
  const { review, slug } = useParams();
  const [reviewToUpdate, setReviewToUpdate] = useState<ReviewProps>();
  useEffect(() => {
    instance
      .get(`pokemon/${slug}/reviews/${review}`, {})
      .then(function (response) {
        if (response.status != 200) {
          alert("Chyba při načítání recenze");
        } else {
          console.log(response.data);
          setReviewToUpdate(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      Upravit recenzi
      <ReviewForm pokemonId={slug} reviewToUpdate={reviewToUpdate} />
    </>
  );
}
