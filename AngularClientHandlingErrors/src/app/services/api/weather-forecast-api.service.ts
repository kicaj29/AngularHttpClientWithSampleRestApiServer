import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from 'src/app/models/WeatherForecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService {

  constructor(private httpClient: HttpClient) {

  }

  getWeatherForecast(success: boolean): Observable<WeatherForecast[]> {
    const params = new HttpParams()
    .set('success', success.toString());

    return this.httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params});
  }
}
