import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';

import { Subscription } from 'rxjs';
import { mockPost } from '../../../../mock/model/post/mock-post';
import { Post } from '../../../model/post';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let backEnd: HttpTestingController;
  let baseUrl: string;
  let tracker: Subscription;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
    });
    service = TestBed.inject(PostService);
    backEnd = TestBed.inject(HttpTestingController);
    baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    tracker = new Subscription();
  });

  afterEach(() => {
    backEnd.verify();

    tracker.unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a single post when retrieving by id', () => {
    tracker.add(
      service.getPost(mockPost.id).subscribe((result: Post) => {
        expect(result).toEqual(mockPost);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}/${mockPost.id}`,
      method: 'GET',
    });

    call.flush(mockPost);
  });

  it('should retrieve multiple posts', () => {
    tracker.add(
      service.getPosts().subscribe((result: Post[]) => {
        expect(result).toEqual([mockPost]);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}`,
      method: 'GET',
    });

    call.flush([mockPost]);
  });

  it('should update the specified post', () => {
    tracker.add(
      service.savePost(mockPost).subscribe((result: Post) => {
        expect(result).toEqual(mockPost);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}/${mockPost.id}`,
      method: 'PUT',
    });

    call.flush(mockPost);
  });

  it('should delete the specified post', () => {
    tracker.add(
      service.deletePost(mockPost).subscribe((result: Post) => {
        expect(result).toEqual(mockPost);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}/${mockPost.id}`,
      method: 'DELETE',
    });

    call.flush(mockPost);
  });

  it('should create the specified post', () => {
    tracker.add(
      service.createPost(mockPost).subscribe((result: Post) => {
        expect(result).toEqual(mockPost);
      }),
    );

    const call: TestRequest = backEnd.expectOne({
      url: `${baseUrl}`,
      method: 'POST',
    });

    call.flush(mockPost);
  });
});
