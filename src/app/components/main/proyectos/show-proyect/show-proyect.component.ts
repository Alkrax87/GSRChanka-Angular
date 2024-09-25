import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-proyect',
  templateUrl: './show-proyect.component.html',
  styleUrl: './show-proyect.component.css'
})
export class ShowProyectComponent {
  constructor(
    public dialogRef: MatDialogRef<ShowProyectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
