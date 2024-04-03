import { ReviewProps } from "@/types";
import { useState, FormEvent, useEffect } from "react";
import instance from "@/config/axios";
interface ReviewFormProps {
  reviewToUpdate?: ReviewProps;
  pokemonId: string | string[];
}
const ReviewForm = ({ reviewToUpdate, pokemonId }: ReviewFormProps) => {
  const defaultReview = { id: 0, title: "", content: "", stars: 0 };
  const [review, setReview] = useState(defaultReview);

  useEffect(() => {
    if (reviewToUpdate) setReview(reviewToUpdate);
  }, [reviewToUpdate]);

  const handleReviewForm = (e: FormEvent) => {
    e.preventDefault();
    if (reviewToUpdate) {
      instance
        .put(`pokemon/${pokemonId}/reviews/${reviewToUpdate.id}`, review)
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    } else {
        // TODO new review
     /*  instance
        .post(`pokemon/${pokemonId}/reviews`, review)
        .then((response) => console.log(response))
        .catch((error) => console.log(error)); */
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleReviewForm(e)}>
        <div>
          <label htmlFor="title">Titulek</label>
          <input
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            type="text"
            name="title"
            value={review.title}
          />
        </div>

        <div>
          <label htmlFor="content">Obsah</label>
          <input
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            type="text"
            name="content"
            value={review.content}
          />
        </div>

        <div>
          <label htmlFor="stars">Hodnocení</label>
          <input
            type="number"
            value={review.stars}
            onChange={(e) =>
              setReview({ ...review, stars: Number(e.target.value) })
            }
            name="stars"
          />
        </div>

        <div>
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
export default ReviewForm;
