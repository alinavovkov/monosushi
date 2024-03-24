import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutComponent } from './pages/about/about.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

import { environment } from '../environments/environment';
import { RollsComponent } from './pages/rolls/rolls.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info/discount-info.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DeliveryComponent,
    AboutComponent,
    DiscountsComponent,
    MainComponent,
    AdminComponent,
    AdminDiscountsComponent,
    AdminCategoriesComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    RollsComponent,
    ProductsComponent,
    ProductInfoComponent,
    CheckoutComponent,
    DiscountInfoComponent,
    AuthorizationComponent,
    CabinetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"monosushi-angular","appId":"1:635897202206:web:3dba2dae5d46ec31af500f","storageBucket":"monosushi-angular.appspot.com","apiKey":"AIzaSyDb88HVDgWheHbXqL-S26idZvVWXjKfqqA","authDomain":"monosushi-angular.firebaseapp.com","messagingSenderId":"635897202206"})),
    // provideStorage(() => getStorage()),
    // provideMessaging(() => getMessaging())
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
