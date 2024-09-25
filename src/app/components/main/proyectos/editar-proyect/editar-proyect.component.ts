import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-editar-proyect',
  templateUrl: './editar-proyect.component.html',
  styleUrl: './editar-proyect.component.css'
})
export class EditarProyectComponent {

  proyectoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<EditarProyectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {
    this.proyectoForm = this.fb.group({
      cuiInversion: [data.cuiInversion, Validators.required],
      nombreInversion: [data.nombreInversion, Validators.required],
      idUsuario: [data.idUsuario, Validators.required],
      provinciaInversion: [data.provinciaInversion, Validators.required],
      distritoInversion: [data.distritoInversion, Validators.required],
      nivelInversion: [data.nivelInversion, Validators.required],
      funcionInversion: [data.funcionInversion, Validators.required],
      modalidadInversion: [data.modalidadInversion, Validators.required],
      estadoInversion: [data.estadoInversion, Validators.required],
      fechaInicioInversion: [data.fechaInicioInversion, Validators.required],
      fechaFinalInversion: [data.fechaFinalInversion, Validators.required],
      presupuestoFormulacionInversion: [data.presupuestoFormulacionInversion, Validators.required],
      presupuestoEjecucionInversion: [data.presupuestoEjecucionInversion, Validators.required],
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  saveChanges(): void {
    if (this.proyectoForm.valid) {
      const proyectoData = this.proyectoForm.value;
      const proyectoDocRef = doc(this.firestore, `proyectos/${this.data.id}`);

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