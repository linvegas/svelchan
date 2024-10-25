export interface Reply {
  sub: string | undefined;
  no: string;
  name: string;
  com: string;
  now: string;
  ext: string;
  filename: string;
  tn_w: number;
  tn_h: number;
  w: number;
  h: number;
  tim: number;
  time: number;
  replies: string[];
};

export interface Post {
  posts: Array<Reply>;
};
