// import post from "$lib/thread.json"

/**
 * @typedef {Object} Post
 * @property {Reply[]} posts
 */

/**
 * @typedef {Object} Reply
 * @property {string|undefined} sub
 * @property {string} no
 * @property {string} name
 * @property {string} com
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const res = await fetch(`https://a.4cdn.org/${params.board}/thread/${params.thread}.json`);
  /** @type {Post} */
  const post = await res.json();
  /** @type {Reply[]} */
  let thread = post.posts
  return {
    board: params.board,
    threadNumber: params.thread,
    thread
  }
}
