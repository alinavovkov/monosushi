import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorizationComponent } from './authorization.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { ToastrModule } from "ngx-toastr";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

xdescribe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      declarations: [AuthorizationComponent],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
