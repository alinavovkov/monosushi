import { Injectable } from '@angular/core';
import { ICategoryResponse, ICategoryRequest } from '../../interfaces/posts.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

   getAllCategories(): Observable<ICategoryResponse[]> {
    return this.http.get<ICategoryResponse[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: ICategoryRequest): Observable<ICategoryResponse> {
    return this.http.post<ICategoryResponse>(`${this.apiUrl}/categories`, category);
  }

  updateCategories(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
    return this.http.patch<ICategoryResponse>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  }

  updateCategoryIDs(deletedIndex: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/categories/updateIDs`, { deletedIndex });
  }
}
