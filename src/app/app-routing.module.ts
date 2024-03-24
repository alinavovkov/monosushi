import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DeliveryComponent } from "./pages/delivery/delivery.component";
// import { MainComponent } from './pages/main/main/main.component';
// import { PaymentComponent } from './pages/payment/payment/payment.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { AdminComponent } from './admin/admin.component';
import { MainComponent } from './main/main.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { RollsComponent } from './pages/rolls/rolls.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ProductInfoResolver } from './services/product/product-info.resolver';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info/discount-info.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'discounts/:id', component: DiscountInfoComponent },

  { path: 'product/:category', component: ProductsComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'rolls', component: RollsComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'discounts', component: AdminDiscountsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'categories', component: AdminCategoriesComponent }
    ]
  },
  { path: '', component: MainComponent }




  // { path: 'main', component: MainComponent },
  // { path: 'payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
