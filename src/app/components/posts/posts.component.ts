import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { PostsState } from '../../state/posts.state';
import { GetPosts } from '../../state/posts.actions';
import { Post } from '../../models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Select(PostsState.getPosts) posts: Observable<Post[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetPosts());
  }
}
