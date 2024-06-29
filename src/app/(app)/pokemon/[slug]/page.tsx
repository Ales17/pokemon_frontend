"use client";
import { useParams } from "next/navigation";
import instance from "@/config/axios";
import { useEffect, useState } from "react";
import { ReviewProps, PokemonProps } from "@/types";
import { Row, Col, Button, Card, Stack, Alert } from "react-bootstrap";
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
        <Row>
          {reviews.map((e, index) => (
            <PokemonReview key={index} review={e} />
          ))}
        </Row>
      </div>
    );
  };

  const PokemonReview = ({ review }: { review: ReviewProps }) => {
    return (
      <Col lg={4}>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>{review.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <span title="Hodnocení (počet hvězdiček)">
                &#9733; {review.stars}
              </span>
            </Card.Subtitle>
            <Card.Text>{review.content}</Card.Text>

            <Stack direction="horizontal" gap={2}>
              <Button onClick={() => handleReviewDelete(review.id)}>
                Vymazat
              </Button>
              <Button href={`/pokemon/${slug}/reviews/${review.id}/edit`}>
                Upravit
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    );
  };

  const PokemonDetail = ({ pokemon }: { pokemon: PokemonProps }) => {
    return (
      <Row>
        <Col lg={6}>
          <Stack gap={3}>
            <div>
              <h2>{pokemon.name}</h2>
              {pokemon.type}
            </div>
            <Stack gap={2} direction="horizontal">
              <Link href={"/pokemon/" + slug + "/edit"}>
                <Button>Upravit</Button>
              </Link>
              <Link href={"/pokemon/" + slug + "/reviews/create"}>
                <Button>Hodnotit</Button>
              </Link>
            </Stack>
          </Stack>
        </Col>
        <Col className="d-flex justify-content-center" lg={6}>
          <img src="https://picsum.photos/400/300" alt={pokemon.name} />
        </Col>
      </Row>
    );
  };

  return (
    <>
      {error && <Alert variant="danger">Pokémon nenalezen</Alert>}
      {pokemon.id != -999 && <PokemonDetail pokemon={pokemon} />}
      {pokemon.id != -999 && reviews && <PokemonReviews reviews={reviews} />}
    </>
  );
}
