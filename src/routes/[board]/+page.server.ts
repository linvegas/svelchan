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
}[];

async function getBoards() {
  const res = await fetch("https://a.4cdn.org/boards.json");

  const catalog: BoardsData = await res.json();

  let boards: Array<Board> = []

  for (let board of catalog.boards) {
    boards.push(board);
  }

  return boards
}

function getBoardTitle(title: string, boards: Array<Board>) {
  let board = boards.filter(b => b.board === title);
  let result = board.map(b => b.title)[0];

  return result
}

export const load: PageServerLoad = async({ params }) => {
  const res = await fetch(`https://a.4cdn.org/${params.board}/catalog.json`);

  const catalog: Catalog = await res.json();

  const threadsPromise: Promise<Array<Thread>> = new Promise((resolve) => {
    let threads: Array<Thread> = []

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
