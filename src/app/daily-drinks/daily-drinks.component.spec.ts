import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDrinksComponent } from './daily-drinks.component';

describe('DailyDrinksComponent', () => {
  let component: DailyDrinksComponent;
  let fixture: ComponentFixture<DailyDrinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDrinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
