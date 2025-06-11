import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpHandler, provideHttpClient } from '@angular/common/http';
import { PostService } from '../../service/rest/post/post.service';
import { ResultComponent } from './result.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultComponent],
      providers: [provideHttpClient(), HttpHandler, PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
