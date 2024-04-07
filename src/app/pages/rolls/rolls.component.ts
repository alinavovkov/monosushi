import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import { IProductResponse } from '../../interfaces/posts.interface';


@Component({
  selector: 'app-rolls',
  templateUrl: './rolls.component.html',
  styleUrl: './rolls.component.scss'
})
export class RollsComponent implements OnInit, OnDestroy {

  public productItems: Array<IProductResponse> = [];
  // public userProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;
  counter: number = 0;
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


  ngOnInit(): void {
    this.getProducts();

  }

  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategory(categoryName).subscribe(data => {
      this.productItems = data as IProductResponse[];
    })
  }

  getProducts(): void {
    this.productService.getAllFirebase().subscribe(data => {
      this.productItems = data as IProductResponse[];
    })
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
}
