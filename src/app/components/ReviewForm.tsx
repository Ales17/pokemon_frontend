import { ReviewProps } from "@/types";
import { useState, FormEvent, useEffect } from "react";
import instance from "@/config/axios";
import { Form, Button, Alert } from "react-bootstrap";
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

  return (
    <>
      <Form onSubmit={(e) => handleReviewForm(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Titulek</Form.Label>
          <Form.Control
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            type="text"
            name="title"
            value={review.title}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Obsah</Form.Label>
          <Form.Control
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            type="text"
            name="content"
            value={review.content}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Hodnocení</Form.Label>
          <Form.Control
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
        </Form.Group>

        <Form.Group>
          <Button type="submit" value="Uložit">
            Uložit
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};
export default ReviewForm;
