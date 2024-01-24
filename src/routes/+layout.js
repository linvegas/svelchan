import boardsData from "$lib/boards.json"

/**
 * @typedef {Object} Board
 * @property {string} board
 * @property {string} title
 */

/** @type {import('./$types').LayoutLoad} */
export async function load({}) {
  /** @type {Board[]} */
  let boards = []
  for (let board of boardsData.boards) {
    boards.push(board)
  }
  return {
    boards
  }
}
