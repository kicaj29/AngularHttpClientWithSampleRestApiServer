import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private errorService: ErrorService, private loggerService: LoggingService, private notifier: NotificationService, private zone: NgZone) {

  }

  handleError(error: Error | HttpErrorResponse) {
    // When an error happens asynchronously, it usually happens outside change detection.
    // That`s why use zone to properly display error message.
    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
      // Server error
      console.log('[GlobalErrorHandlerService]: handling server error...');
      message = this.errorService.getServerErrorMessage(error);
      stackTrace = this.errorService.getServerStack(error);
      this.zone.run(() => this.notifier.showError(message));
    } else {
      // Client Error
      console.log('[GlobalErrorHandlerService]: handling client error...');
      message = this.errorService.getClientErrorMessage(error);
      stackTrace = this.errorService.getClientStack(error);
      this.zone.run(() => this.notifier.showError(message));
    }

    // Always log errors
    this.loggerService.logError(message, stackTrace);
    console.error(error);
  }

}
