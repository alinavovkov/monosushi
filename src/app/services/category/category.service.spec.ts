import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { ICategoryResponse } from "../../interfaces/posts.interface";

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController; // Add HttpTestingController variable

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService] // Provide CategoryService
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController); // Initialize httpMock
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all categories', () => {
    const mockCategories: ICategoryResponse[] = [
      {
        id: 1,
        title: 'string',
        way: 'string',
        img: 'string',
      }
    ];

    // Call the method to test
    service.getAllFirebase().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    // Define the expected HTTP request
    //const req = httpMock.expectOne(`${service.apiUrl}/categories`);
    //expect(req.request.method).toBe('GET');

    // Provide mock data as response
   // req.flush(mockCategories);
  });

});
