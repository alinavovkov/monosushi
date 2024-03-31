import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../interfaces/posts.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInfoResolver  {

  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResponse> {
    return this.productService.getOne(Number(route.paramMap.get('id')));
  }
}
