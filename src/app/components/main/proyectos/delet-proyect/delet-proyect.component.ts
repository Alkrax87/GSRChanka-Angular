import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delet-proyect',
  templateUrl: './delet-proyect.component.html',
  styleUrl: './delet-proyect.component.css'
})
export class DeletProyectComponent {

  constructor(public dialogRef: MatDialogRef<DeletProyectComponent>) {}

  // Si se cancela, cerramos el modal sin eliminar
  onCancel(): void {
    this.dialogRef.close(false); // Devuelve false
  }

  // Si se confirma, devolvemos true para eliminar
  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve true
  }
}