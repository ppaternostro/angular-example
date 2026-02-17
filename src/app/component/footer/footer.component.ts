import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, ClockComponent],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
