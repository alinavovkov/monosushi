import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CabinetComponent } from './cabinet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
// import {RouterTestingModule} from "@angular/router/testing";

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot(
          [{path: 'cabinet', component: CabinetComponent}]
        )
      ],
      declarations: [CabinetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
