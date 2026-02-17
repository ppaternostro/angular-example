import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            close: () => {
              // Intentionally empty method
            },
          },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  ['apply', 'cancel'].forEach((param) => {
    it(`should execute ${param}() method when ${param.toUpperCase()} button is clicked`, () => {
      const title = fixture.debugElement.query(
        By.css('#create-title'),
      ).nativeElement;
      const body = fixture.debugElement.query(
        By.css('#create-body'),
      ).nativeElement;
      const button = fixture.debugElement.query(
        By.css(`#create-${param}`),
      ).nativeElement;

      spyOn(component, `${param}` as keyof CreateComponent);

      component.title = 'Title';
      component.body = 'Body';

      title.dispatchEvent(new Event('input'));
      body.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.title).toBe(title.value);
      expect(component.body).toBe(body.value);

      button.click();

      expect(
        param === 'apply' ? component.apply : component.cancel,
      ).toHaveBeenCalled();
    });
  });
});
