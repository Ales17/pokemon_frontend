import instance from "@/app/axios";

export const fetchPokemons = async () => {
  try {
    const response = await instance.get("pokemon");
    return response;
  } catch (error) {
    console.error("Error fetching Pokemons:", error);
    throw error;
  }
};
