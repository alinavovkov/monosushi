import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {IPostRequest, IPostResponse} from "../interfaces/posts.interface";

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all posts', () => {
    const mockPosts: IPostResponse[] = [
      {
        id: 1,
        date: new Date(),
        title: 'string',
        headline: 'string',
        text: 'string',
        img: 'string',
        }
    ];

    service.getAll().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should retrieve a single post by ID', () => {
    const postId = 1;
    const mockPost: IPostResponse = {
      id: 1,
      date: new Date(),
      title: 'string',
      headline: 'string',
      text: 'string',
      img: 'string',
    };

    service.getOne(postId).subscribe(post => {
      expect(post).toEqual(mockPost);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });

  it('should create a new post', () => {
    const newPost: IPostRequest = {
        date: new Date(),
      title: 'string',
      headline: 'string',
      text: 'string',
      img: 'string',
  };
    const createdPost: IPostResponse = { id: 3, ...newPost };

    service.create(newPost).subscribe(post => {
      expect(post).toEqual(createdPost);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/posts`);
    expect(req.request.method).toBe('POST');
    req.flush(createdPost);
  });
});


// Statements   : 24.85% ( 133/535 )
// Branches     : 7.59% ( 6/79 )
// Functions    : 18.39% ( 39/212 )
// Lines        : 23.9% ( 125/523 )


// Statements   : 25.23% ( 135/535 )
// Branches     : 7.59% ( 6/79 )
// Functions    : 19.33% ( 41/212 )
// Lines        : 24.28% ( 127/523 )
