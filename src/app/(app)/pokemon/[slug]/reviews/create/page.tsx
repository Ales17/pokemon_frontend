"use client";
import ReviewForm from "@/app/components/ReviewForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { slug } = useParams();

  return (
    <>
      <ReviewForm pokemonId={slug} />
    </>
  );
};

export default Page;
