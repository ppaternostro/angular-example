import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  onInfoClick() {
    const dialogConfig = new MatDialogConfig();

    // Prevents closing the dialog by clicking outside (modal)
    dialogConfig.disableClose = true;

    this.dialog.open(AboutDialogComponent, dialogConfig);
  }
}
