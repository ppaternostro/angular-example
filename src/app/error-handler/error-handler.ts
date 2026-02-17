/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from '../service/error/error.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler extends ErrorHandler {
  private errorService = inject(ErrorService);
  private snackBar = inject(MatSnackBar);
  private ngZone = inject(NgZone);

  override handleError(error: any): void {
    let message: string;
    let _stackTrace: string | undefined;
    let title: string;

    if (error instanceof HttpErrorResponse) {
      // Server Error
      title = 'Server Error';
      message = this.errorService.getServerMessage(error);
      _stackTrace = this.errorService.getServerStack(error);
    } else {
      // Client Error
      title = 'Client Error';
      message = this.errorService.getClientMessage(error);
      _stackTrace = this.errorService.getClientStack(error);
    }

    // Executing in the Angular Zone fixes anomalous side effects (e.g., double display)
    this.ngZone.run(() => {
      this.snackBar.open(`${title} - ${message}`, 'Close');
    });
  }
}
