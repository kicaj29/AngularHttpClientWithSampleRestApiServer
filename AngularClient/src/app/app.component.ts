import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherForecast } from './weather-forecast';
import { catchError, map } from 'rxjs/operators';
import { WeatherForecastSummary } from './weather-forecast-summary';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularClient';

  constructor(private _httpClient: HttpClient) {

  }

  playWithGet() {

    console.log("playing with get...");

    // option 1 - simple usage
    this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast').subscribe(
      (data: WeatherForecast[]) => {
        if (data) {
          data.forEach(wf => {
            console.log(`date: ${wf.date}, temperatureC: ${wf.temperatureC}, temperatureF: ${wf.temperatureF}, summary: ${wf.summary},`);
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(`status: ${error?.error.statusDescription}`);
        console.log(`status: ${error?.status}`);
      }
    );

    // option 2 - use pipe, map, catchError
    let observable = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast').pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error: HttpErrorResponse) => {
          console.log('THIS WILL NEVER BE EXECUTED !!!! mapping error result...');
          let res = new WeatherForecastSummary();
          res.count = -1;
        }
      ),
      catchError(error => {
        console.log("catching error...");
        let res = new WeatherForecastSummary();
        res.count = -1;
        return of(res);
      })
    );

    observable.subscribe(
      (data: WeatherForecastSummary) => {
        console.log(data.count);
      },
      (error: WeatherForecastSummary) => {
        console.log(`error: ${error.count}`);
      }
    );

  }

}
