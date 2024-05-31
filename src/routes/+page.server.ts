import type { PageServerLoad } from './$types';

type Board = {
  board: string;
  title: string;
  meta_description: string;
  ws_board: 0 | 1;
  bump_limt: number;
  image_limt: number;
};

type BoardsData = {
  boards: Board[]
};

export const load: PageServerLoad = async () => {
  const res = await fetch("https://a.4cdn.org/boards.json");

  const catalog: BoardsData = await res.json();

  let boards: Array<Board> = [];

  for (let board of catalog.boards) {
    boards.push(board);
  }

  return {
    boards,
  }
}
