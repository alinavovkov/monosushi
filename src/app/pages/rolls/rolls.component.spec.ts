import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollsComponent } from './rolls.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('RollsComponent', () => {
  let component: RollsComponent;
  let fixture: ComponentFixture<RollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
      declarations: [RollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
