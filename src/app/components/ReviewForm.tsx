import { ReviewProps } from "@/types";
import { useState, FormEvent, useEffect } from "react";
import instance from "@/config/axios";
import { useRouter } from "next/navigation";
interface ReviewFormProps {
  reviewToUpdate?: ReviewProps;
  pokemonId?: string | string[];
}
const ReviewForm = ({ reviewToUpdate, pokemonId }: ReviewFormProps) => {
  const defaultReview = { id: 0, title: "", content: "", stars: 0 };
  const [review, setReview] = useState(defaultReview);

  const router = useRouter();

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
      instance
        .post(`pokemon/${pokemonId}/review`, review)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            const reviewId = response.data.id;
            // TODO redirect to review page (not ready)
            //router.push(`/pokemon/${pokemonId}/review/${reviewId}`);
            // Redirect to the pokemon page
            router.push(`/pokemon/${pokemonId}`);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const inputClass =
    "border-0 border-b border-blue-500 w-full py-2 px-3 text-gray-700";

  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <>
      <form onSubmit={(e) => handleReviewForm(e)}>
        <div className="mb-4">
          <label className={labelClass} htmlFor="title">
            Titulek
          </label>
          <input
            className={inputClass}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            type="text"
            name="title"
            value={review.title}
            required
          />
        </div>

        <div className="mb-4">
          <label className={labelClass} htmlFor="content">
            Obsah
          </label>
          <input
            className={inputClass}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            type="text"
            name="content"
            value={review.content}
            required
          />
        </div>
        <div className="mb-4">
          <label className={labelClass} htmlFor="stars">
            Hodnocení
          </label>
          <input
            className={inputClass}
            type="number"
            value={review.stars}
            onChange={(e) =>
              setReview({ ...review, stars: Number(e.target.value) })
            }
            min={0}
            max={10}
            name="stars"
            required
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
