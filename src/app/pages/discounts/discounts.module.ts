import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountsRoutingModule } from './discounts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DiscountsComponent } from './discounts.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';



@NgModule({
  declarations: [
    DiscountsComponent,
    DiscountInfoComponent
  ],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    SharedModule

  ]
})
export class DiscountsModule { }
