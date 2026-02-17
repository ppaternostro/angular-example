/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  getClientMessage(error: Error): string {
    return !navigator.onLine
      ? 'No Internet Connection'
      : error.message
        ? error.message
        : error.toString();
  }

  getClientStack(error: Error): string | undefined {
    return error ? error.stack : undefined;
  }

  getServerMessage(error: HttpErrorResponse): string {
    if (error && error.error && error.error.status) {
      return `${error.error.status} - ${error.error.error} - ${error.error.message} from ${error.url}`;
    } else if (error) {
      return `${error.status} - ${error.message} from ${error.url}`;
    } else {
      return 'Unknown server error';
    }
  }

  getServerStack(error: HttpErrorResponse): any {
    return error && error.error ? error.error.stack : undefined;
  }
}
