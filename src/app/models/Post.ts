export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewPost = Pick<Post, 'userId' | 'title' | 'body'>;
export type PatchedPost = Pick<Post, 'title' | 'body'>;
