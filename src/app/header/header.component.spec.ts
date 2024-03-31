import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule} from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        RouterModule.forRoot(
          [{path: '', component: HeaderComponent}]
        )
      ],
      declarations: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should change total', () => {
    const FAKE_BASKET = [
      {
        id: 1,
        category: {
          id: 2,
          title: 'qqq',
          way: 'string',
          img: 'qqqq',
        },
        title: 'string',
        ingridients: 'string',
        weight: 330,
        price: 120,
        img: 'string',
        count: 2
      }
    ]
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(240);
    component.basket = [];
    component.getTotalPrice();
    expect(component.getTotalPrice).toHaveBeenCalled();
    expect(component.total).toBe(0);
  });

});


// Statements   : 24.58% ( 132/537 )
// Branches     : 7.22% ( 6/83 )
// Functions    : 17.92% ( 38/212 )
// Lines        : 23.61% ( 124/525 )

//Statements   : 24.85% ( 133/535 )
// Branches     : 7.59% ( 6/79 )
// Functions    : 18.39% ( 39/212 )
// Lines        : 23.9% ( 125/523 )
