import { fetchPokemons } from "./apiService";

export const getPokemons = async () => {
  try {
    const response = await fetchPokemons();
    return response.data;
  } catch (error) {}
};
