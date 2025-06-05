import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  const mockDialogData = {
    userId: 1,
    title: 'Test',
    body: 'Test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogData },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
