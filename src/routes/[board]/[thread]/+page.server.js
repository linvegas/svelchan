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
 * @property {string} filename
 * @property {number} tn_w
 * @property {number} tn_h
 * @property {number} w
 * @property {number} h
 * @property {number} tim
 * @property {number} time
 * @property {string[]} [replies]
 */

/**
  * @param {Reply[]} posts
  * @returns {Array<String[]>}
  */
function getTotalReplies(posts) {
  /** @type {Array<String[]>} */
  let totalReplies = [];

  /** @param {string} id */
  function getPostReplies(id) {
    /** @type {Array<String>} */
    let replies = [];

    posts.forEach(post => {
      if (post.com && post.com.match(`${id}`)) {
        replies.push(`${post.no}`);
      }
    })

    return replies;
  }

  posts.map(p => {
    totalReplies.push(getPostReplies(p.no))
  })

  return totalReplies;
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const res = await fetch(`https://a.4cdn.org/${params.board}/thread/${params.thread}.json`);

  /** @type {Post} */
  const thread = await res.json();

  /** @type {Reply[]} */
  let posts = thread.posts

  let totalReplies = getTotalReplies(posts)

  posts.forEach((post, i) => {
    post.replies = totalReplies[i]
  })

  return {
    board: params.board,
    threadNumber: params.thread,
    posts
  }
}
