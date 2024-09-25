import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-show-tramite',
  templateUrl: './show-tramite.component.html',
  styleUrl: './show-tramite.component.css'
})
export class ShowTramiteComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowTramiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
