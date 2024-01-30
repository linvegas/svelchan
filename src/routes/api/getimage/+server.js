/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const query = url.searchParams.get("query");
  const res = await fetch(query);
  const data = await res.blob();
  return new Response(data);
}
