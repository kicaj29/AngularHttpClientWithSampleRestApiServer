import { TestBed } from '@angular/core/testing';

import { WeatherForecastApiService } from './weather-forecast-api.service';

describe('WeatherForecastApiService', () => {
  let service: WeatherForecastApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherForecastApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
