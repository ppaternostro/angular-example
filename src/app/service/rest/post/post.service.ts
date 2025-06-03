import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../model/post';
import { GenericService } from '../generic.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends GenericService<Post, Post> {
  private baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  public getPost(id: number): Observable<Post> {
    return this.read(`${this.baseUrl}/${id}`);
  }

  public getPosts(): Observable<Post[]> {
    return this.list(this.baseUrl);
  }

  public savePost(post: Post): Observable<Post> {
    return this.update(`${this.baseUrl}/${post.id}`, post);
  }

  public deletePost(post: Post): Observable<Post> {
    return this.delete(`${this.baseUrl}/${post.id}`);
  }

  public createPost(post: Post): Observable<Post> {
    return this.create(`${this.baseUrl}`, post);
  }
}
