import { TestBed } from '@angular/core/testing';

import { DailyDrinksService } from './daily-drinks.service';

describe('DailyDrinksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyDrinksService = TestBed.get(DailyDrinksService);
    expect(service).toBeTruthy();
  });
});
