import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { PostService } from '../../service/rest/post/post.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [provideHttpClientTesting(), PostService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure default state on creation', async () => {
    const searchText = fixture.debugElement.query(
      By.css('#search-text'),
    ).nativeElement;
    const searchButton = fixture.debugElement.query(
      By.css('#search'),
    ).nativeElement;

    const selectHarness = await loader.getHarness(MatSelectHarness);
    const selectedValue = await selectHarness.getValueText();

    expect(selectedValue).toBe('All');
    expect(searchText.disabled).toBeTrue();
    expect(searchButton.disabled).toBeFalse();
  });

  it('should ensure correct state on selection change', async () => {
    // Change selection value
    component.selected = 'Id';
    component.onSelectionChanged(component.selected);

    fixture.detectChanges();

    const searchText = fixture.debugElement.query(
      By.css('#search-text'),
    ).nativeElement;
    const searchButton = fixture.debugElement.query(
      By.css('#search'),
    ).nativeElement;

    const selectHarness = await loader.getHarness(MatSelectHarness);
    const selectedValue = await selectHarness.getValueText();

    expect(selectedValue).toBe('Id');
    expect(searchText.disabled).toBeFalse();
    expect(searchButton.disabled).toBeTrue();

    // Set Search Text value to enable the Search button
    searchText.value = 1;
    searchText.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(searchButton.disabled).toBeFalse();
  });
});
