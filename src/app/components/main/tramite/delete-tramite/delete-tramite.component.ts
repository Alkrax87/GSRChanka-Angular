import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-tramite',
  templateUrl: './delete-tramite.component.html',
  styleUrl: './delete-tramite.component.css'
})
export class DeleteTramiteComponent {
  constructor(public dialogRef: MatDialogRef<DeleteTramiteComponent>) {}

  // Si se cancela, cerramos el modal sin eliminar
  onCancel(): void {
    this.dialogRef.close(false); // Devuelve false
  }

  // Si se confirma, devolvemos true para eliminar
  onConfirm(): void {
    this.dialogRef.close(true); // Devuelve true
  }
}