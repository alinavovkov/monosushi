import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthDialogComponent } from './auth-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import {ToastrService} from "ngx-toastr";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} }
      ],
      declarations: [AuthDialogComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
