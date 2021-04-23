import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { WeatherForecast } from './weather-forecast';
import { catchError, map } from 'rxjs/operators';
import { WeatherForecastSummary } from './weather-forecast-summary';
import { forkJoin, Observable, of } from 'rxjs';
import { WeatherForecastSummaryError } from './weather-forecast-summary-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularClient';

  constructor(private _httpClient: HttpClient) {

  }

  playWithGetOption1(success: boolean) {
    const params = new HttpParams()
    .set('success', success.toString());

    // option 1 - simple usage
    this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params}).subscribe(
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
  }

  playWithGetOption2(success: boolean) {

    const params = new HttpParams()
    .set('success', success.toString());

    // option 2 - use pipe, map, catchError
    let observable = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      ),
      catchError((error: HttpErrorResponse)  => {
        console.log("catching error...");
        let newError = new WeatherForecastSummaryError();
        newError.count = -1;
        newError.errorMessage = error.error.statusDescription;
        return of(newError);
      })
    );

    observable.subscribe(
      (data: WeatherForecastSummary | WeatherForecastSummaryError) => {
        // here 2 data types can be passed because it handles also value emitted by catchError!
        debugger;
        console.log(data.count);
        if (data instanceof WeatherForecastSummaryError) {
          console.log(`handled error message: ${data.errorMessage}`);
        }
      },
      (error) => {
        console.log('I SHOULD NEVER BE EXECUTED');
        // this will never be executed because the error has been already handled in catchError method
        // and now the value is treated as success
      }
    );
  }

  playWithGetOption2a(success: boolean) {

    const params = new HttpParams()
    .set('success', success.toString());

    // option 2a - use pipe, map without catchError - then original error is handled in subscribe
    let observable2a = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      )
    );

    observable2a.subscribe(
      (data: WeatherForecastSummary) => {
        console.log(data.count);
      },
      (error: HttpErrorResponse) => {
        console.log(`status: ${error?.error.statusDescription}`);
        console.log(`status: ${error?.status}`);
      }
    );
  }

  playWithMultipleGets() {

    const paramsTrue = new HttpParams()
    .set('success', true.toString());

    let observableSuccess = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params: paramsTrue}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      ),
      catchError((error: HttpErrorResponse) => {
        console.log("catching error...");
        let newError = new WeatherForecastSummaryError();
        newError.count = -1;
        newError.errorMessage = error.error.statusDescription;
        return of(newError);
      })
    );

    const paramsFalse = new HttpParams()
      .set('success', false.toString());

    let observableFail = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params: paramsFalse}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      ),
      catchError((error: HttpErrorResponse) => {
        console.log("catching error...");
        let newError = new WeatherForecastSummaryError();
        newError.count = -1;
        newError.errorMessage = error.error.statusDescription;
        return of(newError);
      })
    );

    const allRequests: Observable<WeatherForecastSummary>[] = [];
    allRequests.push(observableSuccess);
    allRequests.push(observableFail);

    var finalObservable = forkJoin(allRequests);

    finalObservable.subscribe(
      (data: WeatherForecastSummary[] | WeatherForecastSummaryError[]) => {
        debugger;
        console.log('handling all successes');
        if (data) {
          data.forEach(d => {
            console.log(d.count);
            if (d instanceof WeatherForecastSummaryError) {
              console.log(`handled error message: ${d.errorMessage}`);
            }
          });
        }
      },
      (error) => {
        console.log('I SHOULD NEVER BE EXECUTED');
        // this will never be executed because the error has been already handled in catchError method
        // and now the value is treated as success
      }
    );
  }

  playWithMultipleGetsNoCatchError() {

    const paramsTrue = new HttpParams()
    .set('success', true.toString());

    let observableSuccess = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params: paramsTrue}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      ),
      catchError((error: HttpErrorResponse) => {
        console.log("catching error...");
        let newError = new WeatherForecastSummaryError();
        newError.count = -1;
        newError.errorMessage = error.error.statusDescription;
        return of(newError);
      })
    );

    const paramsFalse = new HttpParams()
      .set('success', false.toString());

    let observableFail1 = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params: paramsFalse}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      )
    );

    let observableFail2 = this._httpClient.get<WeatherForecast[]>('https://localhost:44351/WeatherForecast', {params: paramsFalse}).pipe(
      map(
        (result: WeatherForecast[]) => {
          console.log('mapping success result...');
          let res = new WeatherForecastSummary();
          res.count = result.length;
          return res;
        },
        (error) => {
          console.log('I SHOULD NEVER BE EXECUTED');
          // this will never be executed because map handles only success, to handle an error use catchError!
        }
      )
    );

    const allRequests: Observable<WeatherForecastSummary>[] = [];
    allRequests.push(observableSuccess);
    allRequests.push(observableFail1);
    allRequests.push(observableFail2);

    var finalObservable = forkJoin(allRequests);

    finalObservable.subscribe(
      (data: WeatherForecastSummary[]) => {
        // !!!this will never be executed because!!!:
        // “If any input observable errors at some point,
        // forkJoin will error as well and all other observables will be immediately unsubscribed.”
        debugger;
        console.log('handling all successes');
        if (data) {
          data.forEach(d => {
            console.log(d.count);
          });
        }
      },
      (error: HttpErrorResponse) => {
        debugger;
        console.log(`status: ${error?.error.statusDescription}`);
        console.log(`status: ${error?.status}`);
      }
    );
  }
}
