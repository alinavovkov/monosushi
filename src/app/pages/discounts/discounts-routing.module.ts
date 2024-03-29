import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountsComponent } from './discounts.component';
import { DiscountInfoComponent } from './discount-info/discount-info.component';

const routes: Routes = [
  {
    path: '', component: DiscountsComponent
  },
  {
    path: 'discounts/:id', component: DiscountInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }
