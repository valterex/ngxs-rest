import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetPosts } from './posts.actions';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';

export class PostsStateModel {
  posts: Post[];
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: [],
  },
})
@Injectable()
export class PostsState {
  constructor(private postsService: PostsService) {}

  @Selector()
  static getPosts(state: PostsStateModel): Post[] {
    return state.posts;
  }

  @Action(GetPosts)
  getPosts({
    getState,
    setState,
  }: StateContext<PostsStateModel>): Observable<Post[]> {
    return this.postsService.getPosts().pipe(
      tap((response) => {
        const state = getState();

        setState({
          ...state,
          posts: response,
        });
      })
    );
  }
}
