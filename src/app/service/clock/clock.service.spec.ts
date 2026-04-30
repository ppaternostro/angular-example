import { TestBed } from '@angular/core/testing';

import { beforeEach, describe, expect, it } from 'vitest';
import { ClockService } from './clock.service';

describe('ClockService', () => {
  let service: ClockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
