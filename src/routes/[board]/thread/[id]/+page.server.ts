import type { PageServerLoad } from './$types';
import type { Reply, Post } from '$lib/types';

// type Reply = {
//   sub: string | undefined;
//   no: string;
//   name: string;
//   com: string;
//   now: string;
//   ext: string;
//   filename: string;
//   tn_w: number;
//   tn_h: number;
//   w: number;
//   h: number;
//   tim: number;
//   time: number;
//   replies: string[];
// };
//
// type Post = {
//   posts: Array<Reply>;
// };

function getPostReplies(id: string, posts: Array<Reply>) {
  let replies: Array<string> = [];

  posts.forEach(post => {
    if (post.com && post.com.match(`${id}`)) {
      replies.push(`${post.no}`);
    }
  })

  return replies;
}

function getTotalReplies(posts: Array<Reply>) {
  let totalReplies: Array<string[]> = [];

  posts.map(p => {
    totalReplies.push(getPostReplies(p.no, posts))
  })

  return totalReplies;
}

export const load: PageServerLoad = async({ params }) => {
  const res = await fetch(`https://a.4cdn.org/${params.board}/thread/${params.id}.json`);

  const thread: Post = await res.json();

  let posts: Array<Reply> = thread.posts

  let totalReplies = getTotalReplies(posts)

  posts.forEach((post, i) => {
    post.replies = totalReplies[i]
  })

  return {
    board: params.board,
    threadNumber: params.id,
    posts
  }
}
