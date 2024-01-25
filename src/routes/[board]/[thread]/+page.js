import post from "$lib/thread.json"

/**
 * @typedef {Object} Post
 * @property {string|undefined} sub
 * @property {string} no
 * @property {string} name
 * @property {string} com
 */

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  /** @type {Post[]} */
  let thread = post.posts
  return {
    board: params.board,
    threadNumber: params.thread,
    thread
  }
}
