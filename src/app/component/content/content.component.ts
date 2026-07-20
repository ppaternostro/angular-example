import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [SearchComponent, ResultComponent],
})
export class ContentComponent {}
