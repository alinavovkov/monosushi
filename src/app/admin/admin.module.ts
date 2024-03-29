import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import {SharedModule} from "../shared/shared.module";
import { AdminDiscountsComponent } from './admin-discounts/admin-discounts.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDiscountsComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminCategoriesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
