import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const response = await fetch(`https://api.deezer.com/search?q=${query}`);
  const result = await response.json();

  return new Response(JSON.stringify(result));
}
