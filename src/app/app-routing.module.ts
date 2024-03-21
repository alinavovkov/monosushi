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

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'discounts', component: DiscountsComponent },
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
