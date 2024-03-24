import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service'; 
import { IProductResponse } from '../interfaces/posts.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  public productItems: Array<IProductResponse> = [];
  counter: number = 0;
  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.productItems = data;
    })
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
    }
  }
}