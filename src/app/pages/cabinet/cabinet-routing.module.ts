import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";

const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      { path: 'change-password', component: ChangePasswordComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }
