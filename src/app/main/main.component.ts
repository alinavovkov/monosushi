import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { IProductResponse } from '../interfaces/posts.interface';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  public productItems: Array<IProductResponse> = [];
  counter: number = 0;
  constructor(
    private productService: ProductService,
    private orderService: OrderService

  ) {}

  ngOnInit(): void {
    this.getProducts();
    
  }

  getProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.productItems = data as IProductResponse[];
      console.log(this.productItems.map(product => product.category.way))

    })
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
