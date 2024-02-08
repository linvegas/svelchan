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
 * @property {string} now
 * @property {string} ext
 * @property {number} tn_w
 * @property {number} tn_h
 * @property {number} w
 * @property {number} h
 * @property {number} tim
 * @property {number} time
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const res = await fetch(`https://a.4cdn.org/${params.board}/thread/${params.thread}.json`);
  /** @type {Post} */
  const thread = await res.json();
  /** @type {Reply[]} */
  let posts = thread.posts
  return {
    board: params.board,
    threadNumber: params.thread,
    posts
  }
}
