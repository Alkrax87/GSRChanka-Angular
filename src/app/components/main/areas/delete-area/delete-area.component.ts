import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-area',
  templateUrl: './delete-area.component.html',
  styleUrl: './delete-area.component.css'
})
export class DeleteAreaComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAreaComponent>) {}

  // Si se cancela, cerramos el modal sin eliminar
  onCancel(): void {
    this.dialogRef.close(false); // Devuelve false
  }

  // Si se confirma, devolvemos true para eliminar
  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve true
  }
}