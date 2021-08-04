import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PostsState } from 'src/app/state/posts.state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  @Select(PostsState.isLoading) loading: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {}
}
