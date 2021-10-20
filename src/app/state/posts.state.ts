import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';

import {
  GetPost,
  GetPostComments,
  GetPosts,
  GetPostsPerPage,
  SetCurrentPage,
} from './posts.actions';

export class PostsStateModel {
  posts: Array<Post>;
  currentPage: number;
  postsPerPage: Array<Post>;
  post: Post;
  postComments: Array<Comment>;
  loading: boolean;
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    currentPage: null,
    postsPerPage: [],
    post: null,
    postComments: [],
    loading: false,
  },
})
@Injectable()
export class PostsState {
  constructor(private postsService: PostsService) {}

  @Selector()
  static getPosts(state: PostsStateModel): Post[] {
    return state.posts;
  }

  @Selector()
  static getPostsPerPage(state: PostsStateModel): Post[] {
    return state.postsPerPage;
  }

  @Selector()
  static getPost(state: PostsStateModel): Post {
    return state.post;
  }

  @Selector()
  static getPostComments(state: PostsStateModel): Comment[] {
    return state.postComments;
  }

  @Selector()
  static isLoading(state: PostsStateModel): boolean {
    return state.loading;
  }

  @Action(GetPosts)
  getPosts({ patchState }: StateContext<PostsStateModel>): Observable<Post[]> {
    patchState({ loading: true });

    return this.postsService.getPosts().pipe(
      tap((response) => {
        patchState({
          loading: false,
          posts: response,
          post: null,
          postComments: null,
        });
      })
    );
  }

  @Action(GetPost)
  getPost(
    { patchState }: StateContext<PostsStateModel>,
    { postId }: GetPost
  ): Observable<Post> {
    patchState({ loading: true });

    return this.postsService.getPost(postId).pipe(
      tap((response) => {
        patchState({ loading: false, post: response });
      })
    );
  }

  @Action(GetPostComments)
  getPostComments(
    { patchState }: StateContext<PostsStateModel>,
    { postId }: GetPostComments
  ): Observable<Comment[]> {
    patchState({ loading: true });

    return this.postsService.getPostComments(postId).pipe(
      tap((response) => {
        patchState({ loading: false, postComments: response });
      })
    );
  }

  @Action(SetCurrentPage)
  setCurrentPage(
    { patchState }: StateContext<PostsStateModel>,
    { page }: SetCurrentPage
  ): void {
    patchState({ currentPage: page });
  }

  @Action(GetPostsPerPage)
  getPostsPerPage(
    { patchState }: StateContext<PostsStateModel>,
    { data }: GetPostsPerPage
  ): void {
    patchState({ postsPerPage: data });
  }
}
