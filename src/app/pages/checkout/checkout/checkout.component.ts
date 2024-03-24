import { Component, OnInit } from '@angular/core';
import { IProductResponse } from '../../../interfaces/posts.interface';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  public clickerMenu = false;
  public clickerBasket = false;
  public productItems: any;
  public menuL = false;
  public total = 0;
  public totalCount = 0;

  private basket: Array<IProductResponse> = [];
public all: any;
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
  }

  loadBasket(): void {
    const basketData = localStorage.getItem('basket');
    if (basketData) {
      this.basket = JSON.parse(basketData);
      this.productItems = this.basket; // Assign parsed JSON array to productItems
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket.reduce((total: number, prod: IProductResponse) => {
      const productPrice = isNaN(prod.price) ? 0 : prod.price;
      const productCount = isNaN(prod.count) ? 0 : prod.count;
      return total + (productPrice * productCount);
    }, 0);
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => {
      const productCount = isNaN(prod.count) ? 0 : prod.count;
      return this.totalCount + productCount;
    }, 0);
  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    });
  }

  hamButton() {
    this.clickerMenu = !this.clickerMenu;
  }

  menu() {
    this.menuL = !this.menuL;
  }

  hamButtonBasket() {
    this.clickerBasket = !this.clickerBasket;
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
    this.saveBasket(); // Save basket after count update
  }

  deleteProductFromBasket(product: IProductResponse): void {
    this.basket = this.basket.filter(prod => prod !== product); // Remove product from basket
    this.saveBasket(); // Save updated basket
  }

  saveBasket(): void {
    localStorage.setItem('basket', JSON.stringify(this.basket)); // Save basket to local storage
    this.getTotalPrice(); // Update total price after any changes
  this.getTotalCount();
  }
}
