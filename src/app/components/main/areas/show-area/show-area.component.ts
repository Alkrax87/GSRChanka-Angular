import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-show-area',
  templateUrl: './show-area.component.html',
  styleUrl: './show-area.component.css'
})
export class ShowAreaComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
