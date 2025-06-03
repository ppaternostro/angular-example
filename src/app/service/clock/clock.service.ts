import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClockService {
  private clock$: Observable<Date>;

  constructor() {
    this.clock$ = timer(0, 1000).pipe(map((_: number) => new Date()));
  }

  getClock(): Observable<Date> {
    return this.clock$;
  }
}
