import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClockComponent } from '../clock/clock.component';
import { FooterComponent } from './footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent, ClockComponent],
      imports: [MatToolbarModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
