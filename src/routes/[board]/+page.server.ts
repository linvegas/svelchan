// import catalog from "$lib/catalog.json"

/**
 * @typedef {Object} Board
 * @property {string} board
 * @property {string} title
 */

/**
 * @typedef {Object} BoardsData
 * @property {Board[]} boards
 */

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

async function getBoards() {
  const res = await fetch("https://a.4cdn.org/boards.json");

  /** @type {BoardsData} */
  const catalog = await res.json();

  /** @type {Board[]} */
  let boards = []

  for (let board of catalog.boards) {
    boards.push(board);
  }

  return boards
}

/**
 * @param {string} title
 * @param {Board[]} boards
 * */
function getBoardTitle(title, boards) {
  // const title = fetch("https://a.4cdn.org/boards.json")
    // .then(res => res.json())
    // .then(data => boards.filter(b => b.board === title))
  let board = boards.filter(b => b.board === title);
  let result = board.map(b => b.title );
  return result
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

  const boards = await getBoards();
  const title = getBoardTitle(params.board, boards)

  return {
    board: params.board,
    boards,
    title,
    lazy: {
      threads: threadsPromise
    }
  }
}
