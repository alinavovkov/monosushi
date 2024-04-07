import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {IProductRequest, IProductResponse} from '../../interfaces/posts.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc, DocumentData, collection
} from "@angular/fire/firestore";
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private afs: Firestore
  ) {
    this.productCollection = collection(this.afs, 'products');

  }

  // getAll(): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(this.api.products);
  // }
  //
  // getAllByCategory(name: string): Observable<IProductResponse[]> {
  //   return this.http.get<IProductResponse[]>(`${this.api.products}?category.way=${name}`);
  // }
  //
  // getOne(id: number): Observable<IProductResponse> {
  //   return this.http.get<IProductResponse>(`${this.api.products}/${id}`);
  // }
  //
  // create(product: IProductRequest): Observable<IProductResponse> {
  //   return this.http.post<IProductResponse>(this.api.products, product);
  // }
  //
  // update(product: IProductRequest, id: number): Observable<IProductResponse> {
  //   return this.http.patch<IProductResponse>(`${this.api.products}/${id}`, product);
  // }
  //
  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.api.products}/${id}`);
  // }

  getAllFirebase() {
    return collectionData(this.productCollection, {idField: 'id'});
  }


  getAllByCategory(categoryName: string) {
    return collectionData(this.productCollection, { idField: 'id' }).pipe(
      map(products =>
        products.filter(product => product['category'].way === categoryName)
      )
    );
  }

  getOneFirebase(id: string | number) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    console.log(productDocumentReference)
    return docData(productDocumentReference, {idField: 'id'});
  }

  // getOneFirebase(id: string) {
  //   const categoryDocumentReference = doc(this.afs, `categories/${id}`);
  //   return docData(categoryDocumentReference, { idField: 'id' });
  // }

  // editCategory(category: ICategoryResponse): void {

  //   this.categoryService.getOneFirebase(category.id as string).subscribe(data => {
  //     console.log(data, 'firebase');
  //     this.editStatus = true;
  //   })
  // }

  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }
}
