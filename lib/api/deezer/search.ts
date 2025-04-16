import { Track } from "@/types/track";

export const search = async (query: string) => {
  const params = new URLSearchParams({ query });

  const response = await fetch(`/api/deezer/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result: { data: Track[] } = await response.json();

  return result.data;
};
