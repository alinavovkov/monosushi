import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategoryRequest } from '../../interfaces/posts.interface';
import {
  Firestore,
  CollectionReference,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc, docData
} from "@angular/fire/firestore";
import { DocumentData, collection } from "@firebase/firestore"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // apiUrl = `http://localhost:3000`;
  private categoryCollection!: CollectionReference<DocumentData>;
  constructor(
    // private http: HttpClient,
    private afs: Firestore
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  //  getAllCategories(): Observable<ICategoryResponse[]> {
  //   return this.http.get<ICategoryResponse[]>(`${this.apiUrl}/categories`);
  // }
  //
  // createCategory(category: ICategoryRequest): Observable<ICategoryResponse> {
  //   return this.http.post<ICategoryResponse>(`${this.apiUrl}/categories`, category);
  // }
  //
  // updateCategories(category: ICategoryRequest, id: number): Observable<ICategoryResponse> {
  //   return this.http.patch<ICategoryResponse>(`${this.apiUrl}/categories/${id}`, category);
  // }
  //
  // deleteCategory(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/categories/${id}`);
  // }
  //
  // updateCategoryIDs(deletedIndex: number): Observable<void> {
  //   return this.http.patch<void>(`${this.apiUrl}/categories/updateIDs`, { deletedIndex });
  // }

  // -------------------------------------------------------------------

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  createFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, {...category});
  }

  deleteFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference);
  }
}
