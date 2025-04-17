import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const response = await fetch(`https://api.deezer.com/track/${id}`);
  const result = await response.json();

  return new Response(JSON.stringify(result));
}
