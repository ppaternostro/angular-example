import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClockService } from '../../service/clock/clock.service';

@Component({
  selector: 'app-clock',
  imports: [DatePipe],
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, OnDestroy {
  private clockService = inject(ClockService);
  private tracker = new Subscription();
  current = new Date();

  ngOnInit(): void {
    this.tracker.add(
      this.clockService.getClock().subscribe((current: Date) => {
        this.current = current;
      }),
    );
  }

  ngOnDestroy(): void {
    this.tracker.unsubscribe();
  }
}
