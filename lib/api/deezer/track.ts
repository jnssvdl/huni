import { Track } from "@/types/track";

export const getTrack = async (id: Track["id"]) => {
  const response = await fetch(`/api/deezer/track/${id}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result: Track = await response.json();

  return result;
};
