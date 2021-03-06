import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { RouterStateModel } from '@ngxs/router-plugin';

import {
  CreatePost,
  GetPost,
  GetPosts,
  PatchPost,
  SetCurrentPage,
} from '../../state/posts.actions';

import { PostsState, PostsStateModel } from '../../state/posts.state';
import { NewPost, PatchedPost, Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Select(PostsState.getPosts) posts: Observable<Post[]>;
  @Select(PostsState.getSelectedPost) selectedPost: Observable<Post>;
  @Select(PostsState.isLoading) loading: Observable<boolean>;

  itemsPerPage = 10;
  allPages: number;
  postsPerPage: Post[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.store
      .dispatch(new GetPosts())
      .subscribe(
        (state: { posts: PostsStateModel; router: RouterStateModel }) => {
          const { posts } = state.posts;
          this.allPages = posts.length / 10;
          this.onPageChange(1);
        }
      );
  }

  getPost(postId: number): void {
    this.store.dispatch(new GetPost(postId));
  }

  createPost(data: NewPost): void {
    this.store.dispatch(new CreatePost(data));
  }

  patchPost(data: PatchedPost, postId: number): void {
    this.store.dispatch(new PatchPost(data, postId));
  }

  onPageChange(page = 1): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;

    this.posts.subscribe((posts) => {
      this.postsPerPage = posts.slice(startItem, endItem);
      this.store.dispatch(new SetCurrentPage(page));
    });
  }
}
