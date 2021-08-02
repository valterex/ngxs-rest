import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import {
  GetPost,
  GetPosts,
  GetPostsByUser,
  CreatePost,
  PostsState,
  PatchPost,
} from '../../state/posts.state';

import { NewPost, PatchedPost, Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Select(PostsState.getPosts) posts: Observable<Post[]>;
  @Select(PostsState.getSelectedPost) selectedPost: Observable<Post>;
  @Select(PostsState.getPostsByUser) postsByUser: Observable<Post[]>;
  @Select(PostsState.getCommentsByPost) postComments: Observable<Post[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.store.dispatch(new GetPosts());
  }

  getPostsByUser(userId: number): void {
    this.store.dispatch(new GetPostsByUser(userId));
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
}
