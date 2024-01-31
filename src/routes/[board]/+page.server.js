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
  return {
    board: params.board,
    lazy: {
      threads: threadsPromise
    }
  }
}
