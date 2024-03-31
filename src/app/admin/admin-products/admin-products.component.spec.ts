import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProductsComponent } from './admin-products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule} from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import {ToastrService} from "ngx-toastr";

describe('AdminProductsComponent', () => {
  let component: AdminProductsComponent;
  let fixture: ComponentFixture<AdminProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [AdminProductsComponent],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
