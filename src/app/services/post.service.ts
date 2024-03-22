import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost, IPostResponse, IPostRequest, 
  ICategoryResponse, ICategoryRequest,
IProduct, IProductRequest, IProductResponse } from '../interfaces/posts.interface';
import { ICategory } from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl  = `http://localhost:3000`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<IPostResponse[]> {
    return this.http.get<IPostResponse[]>(`${this.apiUrl}/posts`);
  }

  getOne(id: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(`${this.apiUrl}/posts/${id}`);
  }

  create(post: IPostRequest): Observable<IPostResponse> {
    return this.http.post<IPostResponse>(`${this.apiUrl}/posts`, post);
  }

  update(post: IPostRequest, id: number): Observable<IPostResponse> {
    return this.http.patch<IPostResponse>(`${this.apiUrl}/posts/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  }

  updatePostIDs(deletedIndex: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/updateIDs`, { deletedIndex });
  }

  // categories
  getAllCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(`${this.apiUrl}/categories`, category);
  }

  updateCategories(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategory>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  updateCategoryIDs(deletedIndex: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/categories/updateIDs`, { deletedIndex });
  }
  
  // products
  getAllProducts(): Observable<IProductResponse[]> {
    return this.http.get<IProductResponse[]>(`${this.apiUrl}/products`);
  }

  createProduct(category: IProductRequest): Observable<IProductResponse> {
    return this.http.post<IProductResponse>(`${this.apiUrl}/products`, category);
  }

  updateProducts(category: IProductRequest, id: number): Observable<IProductResponse> {
    return this.http.patch<IProduct>(`${this.apiUrl}/products/${id}`, category);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  updateProductIDs(deletedIndex: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/products/updateIDs`, { deletedIndex });
  }
}
