import { Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../../model/post';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private postSignal = signal(new Observable<Post[]>());

  // Public read-only signal
  readonly post = this.postSignal.asReadonly();

  updatePost(post: Observable<Post>): void {
    this.updatePosts(post.pipe(map((post) => [post])));
  }

  updatePosts(posts: Observable<Post[]>): void {
    this.postSignal.set(posts);
  }
}
