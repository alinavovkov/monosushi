import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from '../../interfaces/posts.interface';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  public productItems: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  counter: number = 0;
  currentRoute!: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {}

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.productItems = data;
      
    })
    console.log(this.productItems);
  }

  isActive(category: string): boolean {
    const currentRoute = this.activatedRoute.snapshot.url[1]?.path;
    return currentRoute === category;
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }

  // increment() {
  //   this.counter++;
  // }

  // decrement() {
  //   if (this.counter > 0) {
  //     this.counter--;
  //   }
  // }

  productCount(product: IProductResponse, value: boolean): void {
    console.log(product, value)
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }
}

