import { NewPost, PatchedPost } from '../models/Post';

export class GetPosts {
  static readonly type = '[Posts] Posts';
}

export class GetPostsPerPage {
  static readonly type = '[Posts] Posts per page';
}

export class GetPost {
  static readonly type = '[Posts] Post';
  constructor(public postId: number) {}
}

export class GetPostComments {
  static readonly type = '[Posts] Post comments';
  constructor(public postId: number) {}
}

export class CreatePost {
  static readonly type = '[Posts] Create';
  constructor(public data: NewPost) {}
}

export class DeletePost {
  static readonly type = '[Posts] Delete';
  constructor(public postId: number) {}
}

export class PatchPost {
  static readonly type = '[Posts] Patch';
  constructor(public data: PatchedPost, public postId: number) {}
}

export class SetCurrentPage {
  static readonly type = '[Posts] Current page';
  constructor(public page: number) {}
}
