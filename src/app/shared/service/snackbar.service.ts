import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 3000,
    });
  }
}
