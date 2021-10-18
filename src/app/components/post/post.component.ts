import { Component, OnInit } from '@angular/core';
import { RouterState, RouterStateModel } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetPost, GetPostComments } from 'src/app/state/posts.actions';
import { Post } from '../../models/Post';
import { PostsState } from '../../state/posts.state';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Select(PostsState.getPost) post: Observable<Post>;
  @Select(PostsState.getPostComments) comments: Observable<Comment[]>;
  @Select(PostsState.isLoading) loading: Observable<boolean>;

  postId: number;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(RouterState).subscribe((router: RouterStateModel) => {
      this.postId = router.state.root.firstChild.params.id;
    });

    this.store.dispatch(new GetPost(this.postId));
    this.store.dispatch(new GetPostComments(this.postId));
  }
}
