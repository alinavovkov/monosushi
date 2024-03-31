import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoriesComponent } from './admin-categories.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import  { Storage } from "@angular/fire/storage";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {Firestore} from "@angular/fire/firestore";
import {ToastrService} from "ngx-toastr";

describe('AdminCategoriesComponent', () => {
  let component: AdminCategoriesComponent;
  let fixture: ComponentFixture<AdminCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoriesComponent],
      imports: [
        HttpClientTestingModule,
        AngularFireStorageModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
