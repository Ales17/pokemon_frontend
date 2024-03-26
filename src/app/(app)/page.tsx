"use client";
import { useEffect, useState } from "react";
import instance from "../../config/axios";
import { MyLink } from "../components/MyLink";
import { PokemonProps } from "@/types";
import Link from "next/link";
export default function Page() {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState<PokemonProps[] | null>();

  // empty argument - only on first render
  useEffect(() => {
    loadDataFromApi();
  }, []);

  const loadDataFromApi = () => {
    instance
      .get("pokemon")
      .then((response) => {
        setPokemons(response.data.content);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePokemonDelete = (pokemonId: Number) => {
    console.log("Handle P delete");
    instance
      .delete(`pokemon/${pokemonId}/delete`)
      .then((response) => {
        if (response.status == 200)
          setPokemons(pokemons?.filter((e) => e.id !== pokemonId));
      })
      .catch((error) => console.log(error));
  };

  function Button({
    href,
    name,
    onClick,
    colorClass,
  }: {
    href?: string;
    name: string;
    onClick?: () => void;
    colorClass?: string;
  }) {
    const additionalClass = colorClass ? colorClass : " bg-blue-500 hover:bg-blue-700 ";
    const className =
      additionalClass +
      "text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";
    if (href) {
      return (
        <Link className={className} href={href}>
          {name}
        </Link>
      );
    } else if (onClick) {
      return (
        <button className={className} onClick={onClick}>
          {name}
        </button>
      );
    }
  }

  function PokemonRow({
    pokemon,
    tdClassName,
    trClassName,
  }: {
    pokemon: PokemonProps;
    tdClassName: string;
    trClassName: string;
  }) {
    return (
      <tr className={trClassName}>
        <td className={tdClassName}>{pokemon.name}</td>
        <td className={tdClassName}>{pokemon.type}</td>
        <td className={tdClassName + " flex gap-2 justify-center"}>
          <Button href={`/pokemon/${pokemon.id}`} name={"Detail"} />
          <Button href={`/pokemon/${pokemon.id}/edit`} name={"Upravit"} />
          <Button
            onClick={() => handlePokemonDelete(pokemon.id)}
            name="Vymazat"
            colorClass="bg-red-500 hover:bg-red-700 "
          />
        </td>
      </tr>
    );
  }

  function PokemonTable({ pokemons }: { pokemons: PokemonProps[] }) {
    const cellClassName = "p-3";
    const trClassName = "p-3 border-b-2 border-sky-100 hover:bg-sky-100";
    return (
      <table className="w-full table-auto ">
        <thead>
          <tr className={"p-3 border-b-2 border-sky-100"}>
            <th className={cellClassName}>Jméno</th>
            <th className={cellClassName}>Druh</th>
            <th className={cellClassName}>Operace</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((e) => (
            <PokemonRow
              tdClassName={cellClassName}
              trClassName={trClassName}
              key={e.id}
              pokemon={e}
            />
          ))}
        </tbody>
      </table>
    );
  }

  if (loading) {
    return <>Načítání...</>;
  } else {
    return <>{pokemons && <PokemonTable pokemons={pokemons} />}</>;
  }
}
