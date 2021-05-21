import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, Subject, throwError } from 'rxjs';
import { retry, catchError, retryWhen, concatMap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  private readonly retryCount = 2;
  private readonly retryWaitMilliseconds = 1000;

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('[HttpErrorInterceptorService]: started with url ' + request.urlWithParams + ', method: ' + request.method);

    return next.handle(request).pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((error: HttpErrorResponse, count) => {
            if (count <= this.retryCount && ((error.status == 0) || (error.status >= 500))) {
              // Continue retrying if retry count limit is not reached and
              // there is network outage on client side (status = 0)
              // or there is server error.
              // It is very unlikely that retry for client errors (4xx) would help so it is better to not load server in such cases.
              console.log(`[HttpErrorInterceptorService]: retrying ${count} time...`);
              return of(error);
            }
            return throwError(error);
          }),
          delay(this.retryWaitMilliseconds)
        )
      )
    )
  }
}
