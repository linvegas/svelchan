// import boardsData from "$lib/boards.json"

/**
 * @typedef {Object} BoardsData
 * @property {Board[]} boards
 */

/**
 * @typedef {Object} Board
 * @property {string} board
 * @property {string} title
 * @property {string} meta_description
 * @property {0|1} ws_board,
 * @property {number} bump_limt,
 * @property {number} image_limt,
 */

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
  const res = await fetch("https://a.4cdn.org/boards.json");
  /** @type {BoardsData} */
  const catalog = await res.json();
  /** @type {Board[]} */
  let boards = []
  for (let board of catalog.boards) {
    boards.push(board);
  }
  return {
    boards,
  }
}
