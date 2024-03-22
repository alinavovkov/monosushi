import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
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
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.postService.getAllProducts().subscribe(data => {
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
