import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IProductResponse } from '../interfaces/posts.interface';
import { OrderService } from '../services/order/order.service';
import { AccountService } from '../services/account/account.service';
import { ROLE } from '../constants/role.constante';
import { AuthDialogComponent } from '../components/auth-dialog/auth-dialog.component';
import { CallDialogComponent } from '../components/call-dialog/call-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public clickerMenu = false;
  public clickerBasket = false;
  public productItems: any;
  public menuL = false;
  public total = 0;
  public totalCount = 0;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';

  private basket: Array<IProductResponse> = [];
  public all: any;
  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    public dialog: MatDialog

    ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
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

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);

    })
  }

  openCallDialog(): void {
    console.log('hello')
    this.dialog.open(CallDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'call-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);

    })
  }

}
