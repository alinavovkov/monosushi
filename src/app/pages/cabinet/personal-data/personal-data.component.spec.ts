import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataComponent } from './personal-data.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonalDataComponent', () => {
  let component: PersonalDataComponent;
  let fixture: ComponentFixture<PersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PersonalDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
