import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ensure header title and header info button exists on creation', () => {
    const headerTitle = fixture.debugElement.query(
      By.css('#header-title')
    ).nativeElement;
    const headerInfoButton = fixture.debugElement.query(
      By.css('#header-info-button')
    ).nativeElement;

    expect(headerTitle.textContent).toBe('Angular Example Application');
    expect(headerInfoButton).toBeTruthy();
    expect(headerInfoButton.disabled).toBeFalse();
  });

  it('should ensure header info icon click to have been triggered', () => {
    const headerInfoIcon = fixture.debugElement.query(
      By.css('#header-info-icon')
    ).nativeElement;

    expect(headerInfoIcon).toBeTruthy();

    spyOn(component, 'onInfoClick');

    headerInfoIcon.click();

    expect(component.onInfoClick).toHaveBeenCalled();
  });
});
