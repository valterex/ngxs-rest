import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewPost, PatchedPost, Post } from '../models/Post';
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
    return this.http
      .get<Post[]>(this.apiUrl + this.postsUrl)
      .pipe(map((res) => res.splice(0, 10)));
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(this.apiUrl + this.postsUrl + `/${postId}`);
  }

  getPostComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      this.apiUrl + this.postsUrl + `/${postId}/comments`
    );
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(
      this.apiUrl + this.postsUrl + `?userId=${userId}`
    );
  }

  createPost(data: NewPost): Observable<Post> {
    return this.http.post<Post>(
      this.apiUrl + this.postsUrl,
      data,
      this.httpOptions
    );
  }

  deletePost(postId: number): Observable<Post> {
    return this.http.delete<Post>(
      this.apiUrl + this.postsUrl + `/${postId}`,
      this.httpOptions
    );
  }

  patchPost(data: PatchedPost, postId: number): Observable<Post> {
    return this.http.patch<Post>(
      this.apiUrl + this.postsUrl + `/${postId}`,
      data,
      this.httpOptions
    );
  }
}
