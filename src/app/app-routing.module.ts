import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import { DeliveryComponent } from "./pages/delivery/delivery.component";
import { RollsComponent } from './pages/rolls/rolls.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { MainComponent } from './main/main.component';
import { authGuard } from './guards/auth/auth.guard';
import { ProductInfoResolver } from './services/product/product-info.resolver';


const routes: Routes = [
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  { path: 'delivery', component: DeliveryComponent },
  {
    path: 'discounts',
    loadChildren: () => import('./pages/discounts/discounts.module').then(m => m.DiscountsModule)
  },
  { path: 'product/:category', component: ProductsComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent, resolve: {
    productInfo: ProductInfoResolver
  } },
  { path: 'rolls', component: RollsComponent },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
  },
  {
    path: 'cabinet',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
