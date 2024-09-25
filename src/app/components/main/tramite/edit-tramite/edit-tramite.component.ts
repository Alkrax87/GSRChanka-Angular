import { Component,  Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-tramite',
  templateUrl: './edit-tramite.component.html',
  styleUrl: './edit-tramite.component.css'
})
export class EditTramiteComponent {
  proyectoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    public dialogRef: MatDialogRef<EditTramiteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del proyecto
  ) {
    this.proyectoForm = this.fb.group({
      nroDocumento: [data.nroDocumento, Validators.required],
      tipoDocumento: [data.tipoDocumento, Validators.required],
      idUsuario: [data.idUsuario, Validators.required],
      areaOrigen: [data.areaOrigen, Validators.required],
      areaDestino: [data.areaDestino, Validators.required],
      estadoDocumento: [data.estadoDocumento, Validators.required],
      nroFolios: [data.nroFolios, Validators.required],
      asuntoTramite: [data.asuntoTramite, Validators.required],
      estadoInversion: [data.estadoInversion, Validators.required],
      fechaTramite: [data.fechaTramite, Validators.required],
      archivoAdjunto: [data.archivoAdjunto, Validators.required],
    });
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  saveChanges(): void {
    if (this.proyectoForm.valid) {
      const tramiteData = this.proyectoForm.value;
      const tramiteDocRef = doc(this.firestore, `tramites/${this.data.id}`);

      updateDoc(tramiteDocRef, tramiteData)
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