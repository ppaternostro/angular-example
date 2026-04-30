import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ClockService } from '../../service/clock/clock.service';
import { ClockComponent } from './clock.component';

describe('ClockComponent', () => {
  let component: ClockComponent;
  let fixture: ComponentFixture<ClockComponent>;
  let service: ClockService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockComponent],
      providers: [ClockService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ClockService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct time', async () => {
    const spy = vi.spyOn(service, 'getClock').mockReturnValue(of(new Date()));

    fixture.detectChanges();

    spy.mock.results.at(-1)?.value.subscribe((value: Date) => {
      expect(value).toBe(component.current);
    });
  });
});
