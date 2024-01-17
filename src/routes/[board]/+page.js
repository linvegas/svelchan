import catalog from "$lib/catalog.json"

/**
 * @typedef {Object} Thread
 * @property {string} sub
 * @property {string} com
 * @property {number} tn_w
 * @property {number} tn_h
 */

/**
 * @typedef {Object} Catalog
 * @property {number} page
 * @property {Thread[]} threads
 */

/** @type {import('./$types').PageLoad} */
export async function load({}) {
  /** @type {Thread[]} */
  let threads = []
  for (let page of catalog) {
    for (let thread of page.threads) {
      threads.push(thread)
    }
  }
  return {
    threads
  }
}
