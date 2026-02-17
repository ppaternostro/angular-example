import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  dialogRef = inject<MatDialogRef<CreateComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  title: string | undefined;
  body: string | undefined;

  cancel() {
    // Close and send data to parent component
    this.dialogRef.close({ data: undefined });
  }

  apply() {
    // Close and send data to parent component
    this.dialogRef.close({
      data: { userId: this.data.userId, title: this.title, body: this.body },
    });
  }
}
