/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const query = String(url.searchParams.get("q"));

  try {
    const res = await fetch(query);
    const imageData = await res.arrayBuffer();

    const contentType = res.headers.get('content-type') || "application/octet-stream";

    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
      },
    })
  } catch (error) {
    console.error("Error fetch image: ", error);

    return new Response("Error fetching image", {status: 500});
  }
}
