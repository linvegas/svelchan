import type { PageServerLoad } from './$types';

type Board = {
  board: string;
  title: string;
};

type BoardsData = {
  boards: Board[]
};

type Thread = {
  sub: string;
  com: string;
  tn_w: number;
  tn_h: number;
  no: number;
  tim: number;
  replies: number;
  images: number;
};

type Catalog = {
  page: number;
  threads: Thread[];
};

async function getBoards(curBoard: string) {
  const res = await fetch("https://a.4cdn.org/boards.json");

  const boardsData: BoardsData = await res.json();

  const boards: Array<Board> = boardsData.boards;

  const title: string = boards.filter(b => b.board === curBoard).map(b => b.title)[0];

  return {boards, title};
}

export const load: PageServerLoad = async({ params }) => {
  const res = await fetch(`https://a.4cdn.org/${params.board}/catalog.json`);

  const catalog: Array<Catalog> = await res.json();

  const threads: Array<Thread> = catalog.flatMap(page => page.threads);

  const currentBoard = params.board;

  const {boards, title} = await getBoards(currentBoard);

  return {
    currentBoard,
    boards,
    title,
    threads,
  }
}
