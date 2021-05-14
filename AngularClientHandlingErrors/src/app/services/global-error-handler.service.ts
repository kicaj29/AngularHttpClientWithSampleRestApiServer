import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private errorService: ErrorService, private loggerService: LoggingService, private notifier: NotificationService) {

  }

  handleError(error: Error | HttpErrorResponse) {
    // debugger;
    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      console.log('handling server error...');
      message = this.errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      this.notifier.showError(message);
    } else {
      // Client Error
      console.log('handling client error...');
      message = this.errorService.getClientErrorMessage(error);
      this.notifier.showError(message);
    }
    // Always log errors
    this.loggerService.logError(message, stackTrace);
    console.error(error);
  }

}
