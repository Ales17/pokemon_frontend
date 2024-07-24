import { Url } from "next/dist/shared/lib/router/router";

export interface LoginInputs {
  username: string;
  password: string;
}

export interface PokemonProps {
  id: any;
  name: string;
  type: string;
}

export interface UserData {
  name: string;
  uid: string;
  email: string;
}

export interface LinkProps {
  href: Url;
  name: string;
}

export interface PokemonFormProps {
  pokemonToUpdate?: PokemonProps;
}

export interface ReviewProps {
  id: number;
  title: string;
  content: string;
  stars: any;
  createdBy: { id: number; username: string };
}
