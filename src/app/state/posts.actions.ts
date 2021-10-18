import { Post } from '../models/Post';

export class GetPosts {
  static readonly type = '[Posts] Posts';
}

export class GetPostsPerPage {
  static readonly type = '[Posts] Posts per page';
  constructor(public data: Post[]) {}
}

export class GetPost {
  static readonly type = '[Posts] Post';
  constructor(public postId: number) {}
}

export class GetPostComments {
  static readonly type = '[Posts] Post comments';
  constructor(public postId: number) {}
}

export class SetCurrentPage {
  static readonly type = '[Posts] Current page';
  constructor(public page: number) {}
}
