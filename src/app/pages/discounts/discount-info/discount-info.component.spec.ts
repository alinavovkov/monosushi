import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiscountInfoComponent } from './discount-info.component';
import { RouterModule } from '@angular/router';

xdescribe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [DiscountInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
