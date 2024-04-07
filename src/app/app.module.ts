import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { RollsComponent } from './pages/rolls/rolls.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { CheckoutComponent } from './pages/checkout/checkout/checkout.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { CallDialogComponent } from './components/call-dialog/call-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    DeliveryComponent,
    MainComponent,
    RollsComponent,
    ProductsComponent,
    ProductInfoComponent,
    CheckoutComponent,
    AuthDialogComponent,
    CallDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({ "projectId": "monosushi-angular", "appId": "1:635897202206:web:3dba2dae5d46ec31af500f", "storageBucket": "monosushi-angular.appspot.com", "apiKey": "AIzaSyDb88HVDgWheHbXqL-S26idZvVWXjKfqqA", "authDomain": "monosushi-angular.firebaseapp.com", "messagingSenderId": "635897202206" })),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
