import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { RequiredValidator } from "@angular/forms";
import { Observable, of } from "rxjs"
import { share, tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache: Map<string, HttpResponse<any>> = new Map();
  private readonly whiteList: string[] = ["/WeatherForecast"];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    console.log('[CacheInterceptor]: started with url ' + req.urlWithParams + ', method: ' + req.method);

    if ((req.method !== "GET") || (!this.whiteList.some(s => req.url.includes(s)))) {
        return next.handle(req)
    }
    if(req.headers.get("reset")) {
        this.cache.delete(req.urlWithParams);
    }
    const cachedResponse: HttpResponse<any> = this.cache.get(req.urlWithParams);
    if(cachedResponse) {
        return of(cachedResponse.clone())
    } else {
        return next.handle(req).pipe(
            tap(stateEvent => {
                console.log('[CacheInterceptor]: handling response...');
                if(stateEvent instanceof HttpResponse) {
                    console.log("updating cache with correct response...");
                    this.cache.set(req.urlWithParams, stateEvent.clone());
                } else {
                  console.log('[CacheInterceptor]: there was an error so do nothing');
                }
            }),
            share()
        );
    }
  }
}
