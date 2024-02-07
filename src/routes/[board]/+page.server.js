// import catalog from "$lib/catalog.json"

/**
 * @typedef {Object} Thread
 * @property {string} sub
 * @property {string} com
 * @property {number} tn_w
 * @property {number} tn_h
 * @property {number} no
 * @property {number} tim
 * @property {number} replies
 * @property {number} images
 */

/**
 * @typedef {Object[]} Catalog
 * @property {Thread[]} threads
 */

/** @param {string} board */
function getBoardTitle(board) {
  const title = fetch("https://a.4cdn.org/boards.json")
    .then(res => res.json())
    .then(data => data.boards.filter(b => b.board === board))
    .then(board => board.map(b =>  b.title ))
  return title
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const res = await fetch(`https://a.4cdn.org/${params.board}/catalog.json`);
  /** @type {Catalog} */
  const catalog = await res.json();
  /** @type {Promise<Thread[]>} */
  const threadsPromise = new Promise((resolve) => {
    /** @type {Thread[]} */
    let threads = []
    for (let page of catalog) {
      for (let thread of page.threads) {
        threads.push(thread)
      }
    }
    resolve(threads)
  })
  const title = await getBoardTitle(params.board)
  return {
    board: params.board,
    title,
    lazy: {
      threads: threadsPromise
    }
  }
}
