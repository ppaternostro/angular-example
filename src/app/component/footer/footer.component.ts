import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, ClockComponent],
  templateUrl: './footer.component.html',
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
