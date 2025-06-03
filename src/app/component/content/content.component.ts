import { Component, OnInit } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [SearchComponent, ResultComponent],
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
