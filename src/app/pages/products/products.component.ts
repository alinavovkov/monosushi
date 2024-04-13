import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from '../../interfaces/posts.interface';
import { ProductService } from '../../services/product/product.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  public currentProduct!: IProductResponse;

  public productItems: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  counter: number = 0;
  currentRoute!: any;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService


  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadProducts();
      }
    })
  }

  ngOnInit(): void {
    this.loadProducts();
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.productItems = data as IProductResponse[];
      console.log(this.productItems);

    })
  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.productItems = data as IProductResponse[];
    });
  }


  isActive(category: string): boolean {
    const currentRoute = this.activatedRoute.snapshot.url[1]?.path;
    return currentRoute === category;
  }

  ngOnDestroy(): void {
      this.eventSubscription.unsubscribe();
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  productCount(product: IProductResponse, value: boolean): void {
    console.log(product, value)
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        // Ensure product.count is a valid number
        if (isNaN(product.count)) {
          product.count = 1; // Set default value if product.count is NaN
        }
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1; // Reset product count to 1 after adding to basket
    this.orderService.changeBasket.next(true);
  }
}

