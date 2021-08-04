import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { NewPost, Post, PatchedPost } from '../models/Post';

export class GetPosts {
  static readonly type = '[Posts] Get posts';
}

export class GetPost {
  static readonly type = '[Posts] Get post';
  constructor(public postId: number) {}
}

export class GetCommentsByPost {
  static readonly type = '[Posts] Get comments by post';
  constructor(public postId: number) {}
}

export class CreatePost {
  static readonly type = '[Posts] Create post';
  constructor(public data: NewPost) {}
}

export class DeletePost {
  static readonly type = '[Posts] Delete post';
  constructor(public postId: number) {}
}

export class PatchPost {
  static readonly type = '[Posts] Patch post';
  constructor(public data: PatchedPost, public postId: number) {}
}

export class PostsStateModel {
  posts: Post[];
  selectedPost: Post;
  postComments: Comment[];
  loading: boolean;
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
    selectedPost: null,
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
  static getSelectedPost(state: PostsStateModel): Post {
    return state.selectedPost;
  }

  @Selector()
  static getCommentsByPost(state: PostsStateModel): Comment[] {
    return state.postComments;
  }

  @Selector()
  static isLoading(state: PostsStateModel): boolean {
    return state.loading;
  }

  @Action(GetPosts)
  getPosts({
    getState,
    setState,
    patchState,
  }: StateContext<PostsStateModel>): Observable<Post[]> {
    patchState({ loading: true });

    return this.postsService.getPosts().pipe(
      tap((response) => {
        const state = getState();

        setState({
          ...state,
          posts: response,
        });

        patchState({ loading: false });
      })
    );
  }

  @Action(GetPost)
  getSelectedPost(
    { getState, setState }: StateContext<PostsStateModel>,
    { postId }: GetPost
  ): Observable<Post> {
    return this.postsService.getPost(postId).pipe(
      tap((response) => {
        const state = getState();

        setState({
          ...state,
          selectedPost: response,
        });
      })
    );
  }

  @Action(GetCommentsByPost)
  getCommentsByPost(
    { getState, setState }: StateContext<PostsStateModel>,
    { postId }: GetCommentsByPost
  ): Observable<Comment[]> {
    return this.postsService.getPostComments(postId).pipe(
      tap((response) => {
        const state = getState();

        setState({
          ...state,
          postComments: response,
        });
      })
    );
  }

  @Action(CreatePost)
  createPost(
    { getState, patchState }: StateContext<PostsStateModel>,
    { data }: CreatePost
  ): Observable<Post> {
    return this.postsService.createPost(data).pipe(
      tap((response) => {
        const state = getState();

        patchState({
          posts: [...state.posts, response],
        });
      })
    );
  }

  @Action(DeletePost)
  deletePost(
    { getState, setState }: StateContext<PostsStateModel>,
    { postId }: DeletePost
  ): Observable<Post> {
    return this.postsService.deletePost(postId).pipe(
      tap(() => {
        const state = getState();
        const filteredPosts = state.posts.filter((post) => post.id !== postId);

        setState({
          ...state,
          posts: filteredPosts,
        });
      })
    );
  }

  @Action(PatchPost)
  patchPost(
    { getState, setState }: StateContext<PostsStateModel>,
    { data, postId }: PatchPost
  ): Observable<Post> {
    return this.postsService.patchPost(data, postId).pipe(
      tap((response) => {
        const state = getState();
        const allPosts = [...state.posts];
        const postIndex = allPosts.findIndex((post) => post.id === postId);

        allPosts[postIndex] = response;

        setState({
          ...state,
          posts: allPosts,
        });
      })
    );
  }
}
