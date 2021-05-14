import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from '../models/WeatherForecast';
import { WeatherForecastApiService } from './api/weather-forecast-api.service';

/**
 * This service does nothing, it only 'simulates' a layer that usually exist between api service and component.
 */
@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private apiService: WeatherForecastApiService) {

  }

  getWeatherForecast(success: boolean): Observable<WeatherForecast[]>{

    /*let promise = new Promise((resolve, reject) => {
      reject("dddddddddddd");
    });

    promise
    .then(() => {

    })
    .catch(error => {
      console.log('catching promise');
    });*/

    //throw new Error("ssssssssssssssss");
    return this.apiService.getWeatherForecast(success);
  }
}
