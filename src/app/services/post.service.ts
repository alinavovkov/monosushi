import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IPostResponse, IPostRequest,
  ICategoryResponse, ICategoryRequest,
  IProductRequest, IProductResponse
} from '../interfaces/posts.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from "@angular/fire/firestore";
import {collection, DocumentData} from "@firebase/firestore";
// import {  } from '../interfaces/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // public apiUrl = `http://localhost:3000`;
  private discountsCollection!: CollectionReference<DocumentData>;


  constructor(
    // private http: HttpClient
    private afs: Firestore

  ) {
    this.discountsCollection = collection(this.afs, 'discounts');
  }

  // getAll(): Observable<IPostResponse[]> {
  //   return this.http.get<IPostResponse[]>(`${this.apiUrl}/posts`);
  // }
  //
  // getOne(id: number): Observable<IPostResponse> {
  //   return this.http.get<IPostResponse>(`${this.apiUrl}/posts/${id}`);
  // }
  //
  // create(post: IPostRequest): Observable<IPostResponse> {
  //   return this.http.post<IPostResponse>(`${this.apiUrl}/posts`, post);
  // }
  //
  // update(post: IPostRequest, id: number): Observable<IPostResponse> {
  //   return this.http.patch<IPostResponse>(`${this.apiUrl}/posts/${id}`, post);
  // }
  //
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/posts/${id}`);
  // }
  //
  // updatePostIDs(deletedIndex: number): Observable<void> {
  //   return this.http.patch<void>(`${this.apiUrl}/updateIDs`, { deletedIndex });
  // }



  // products
//   getAllProducts(): Observable<IProductResponse[]> {
//     return this.http.get<IProductResponse[]>(`${this.apiUrl}/products`);
//   }

//   getAllByCategory(name: string): Observable<IProductResponse[]> {
//     return this.http.get<IProductResponse[]>(`${this.apiUrl}/products?category.path=${name}`);
//   }

//   createProduct(category: IProductRequest): Observable<IProductResponse> {
//     return this.http.post<IProductResponse>(`${this.apiUrl}/products`, category);
//   }

//   updateProducts(category: IProductRequest, id: number): Observable<IProductResponse> {
//     return this.http.patch<IProductResponse>(`${this.apiUrl}/products/${id}`, category);
//   }

//   deleteProduct(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
//   }

//   updateProductIDs(deletedIndex: number): Observable<void> {
//     return this.http.patch<void>(`${this.apiUrl}/products/updateIDs`, { deletedIndex });
//   }
  getAllFirebase() {
    return collectionData(this.discountsCollection, { idField: 'id' });
  }

  getOneFirebase(id: string | number) {
    const discountsDocumentReference = doc(this.afs, `discounts/${id}`);
    return docData(discountsDocumentReference, { idField: 'id' });
  }

  createFirebase(discount: IPostRequest) {
    return addDoc(this.discountsCollection, discount);
  }

  updateFirebase(discount: IPostRequest, id: string) {
    const discountsDocumentReference = doc(this.afs, `discounts/${id}`);
    return updateDoc(discountsDocumentReference, {...discount});
  }

  deleteFirebase(id: string) {
    const discountsDocumentReference = doc(this.afs, `discounts/${id}`);
    return deleteDoc(discountsDocumentReference);
  }
}
