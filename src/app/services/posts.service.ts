import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  apiUrl = environment.apiUrl;
  postsUrl = '/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl + this.postsUrl, this.httpOptions);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(
      this.apiUrl + this.postsUrl + `/${postId}`,
      this.httpOptions
    );
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.apiUrl + this.postsUrl + `/${postId}/comments`,
      this.httpOptions
    );
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(
      this.apiUrl + this.postsUrl + `/${postId}`,
      this.httpOptions
    );
  }
}
