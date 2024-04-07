import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProductResponse } from '../../interfaces/posts.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver implements Resolve<IProductResponse> {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResponse> {
    const productId = route.paramMap.get('id');
    if (productId) {
      return this.productService.getOneFirebase(productId).pipe(
        map(documentData => {
          // Check if documentData is defined
          if (documentData) {
            // Assuming your ProductService returns a DocumentData
            // You need to map it to IProductResponse
            return {
              id: documentData.id, // Assuming id exists in DocumentData
              // map other properties here based on your IProductResponse interface
            } as IProductResponse;
          } else {
            throw new Error('Product not found');
          }
        })
      );
    } else {
      throw new Error('Product ID not found');
    }
  }
}
