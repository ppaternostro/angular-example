import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpHandler, provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { PostService } from '../../service/rest/post/post.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [provideHttpClient(), HttpHandler, PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure default state on creation', () => {
    const searchBy: HTMLElement = fixture.debugElement.query(
      By.css('#search-by')
    ).nativeElement;
    const searchText = fixture.debugElement.query(
      By.css('#search-text')
    ).nativeElement;
    const searchButton = fixture.debugElement.query(
      By.css('#search')
    ).nativeElement;

    expect(searchBy.getAttribute('ng-reflect-value')).toBe('All');
    expect(searchText.disabled).toBeTrue();
    expect(searchButton.disabled).toBeFalse();
  });

  it('should ensure correct state on selection change', () => {
    // Change selection value
    component.selected = 'Id';
    component.onSelectionChanged(component.selected);

    fixture.detectChanges();

    const searchBy: HTMLElement = fixture.debugElement.query(
      By.css('#search-by')
    ).nativeElement;
    const searchText = fixture.debugElement.query(
      By.css('#search-text')
    ).nativeElement;
    const searchButton = fixture.debugElement.query(
      By.css('#search')
    ).nativeElement;

    expect(searchBy.getAttribute('ng-reflect-value')).toBe('Id');
    expect(searchText.disabled).toBeFalse();
    expect(searchButton.disabled).toBeTrue();

    // Set Search Text value to enable the Search button
    searchText.value = 1;
    searchText.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(searchButton.disabled).toBeFalse();
  });
});
