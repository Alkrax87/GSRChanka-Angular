import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-area',
  templateUrl: './edit-area.component.html',
  styleUrl: './edit-area.component.css'
})
export class EditAreaComponent {
  proyectoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<EditAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {
    this.proyectoForm = this.fb.group({
      nombreArea: [data.nombreArea, Validators.required],
      idUsuario: [data.idUsuario, Validators.required],
      nroEmpleados: [data.nroEmpleados, Validators.required],
      Observaciones: [data.Observaciones, Validators.required],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  saveChanges(): void {
    if (this.proyectoForm.valid) {
      const proyectoData = this.proyectoForm.value;
      const proyectoDocRef = doc(this.firestore, `areas/${this.data.id}`);

      updateDoc(proyectoDocRef, proyectoData)
        .then(() => {
          console.log('Proyecto actualizado correctamente');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error al actualizar el proyecto: ', error);
        });
    }
  }
}
