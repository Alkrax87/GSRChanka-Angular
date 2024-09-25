import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-create-tramite',
  templateUrl: './create-tramite.component.html',
  styleUrl: './create-tramite.component.css'
})
export class CreateTramiteComponent {
  proyectoForm: FormGroup;
 
  firebase: Firestore;

  

  constructor(
    public _matDialogRef: MatDialogRef<CreateTramiteComponent>,
    private fb: FormBuilder,
    private firestore: Firestore
  ) 
  {
    this.proyectoForm = this.fb.group({
      nroDocumento: ['', [
        Validators.required,
        Validators.maxLength(6)
      ]],
      tipoDocumento: ['', Validators.required],
      idUsuario: ['', Validators.required],
      areaOrigen: ['', Validators.required],
      areaDestino: ['', Validators.required],
      estadoDocumento: ['', Validators.required],
      nroFolios: ['', Validators.required],
      asuntoTramite : ['', Validators.required],
      fechaTramite: ['', Validators.required],
      archivoAdjunto: ['', Validators.required],
      
    });
    this.firebase = firestore;
  }
  
  // Método para cerrar el modal
  closeModal(): void {
    this._matDialogRef.close();
  }
  // Método para agregar el proyecto directamente a Firestore
  addProyecto(): void {
    if (this.proyectoForm.valid) {
      const tramitesRef = collection(this.firebase, 'tramites');
      addDoc(tramitesRef, this.proyectoForm.value)
        .then(() => {
          console.log('Proyecto agregado correctamente');
          this.closeModal(); // Cierra el modal después de guardar
        })
        .catch((error) => {
          console.error('Error al agregar proyecto: ', error);
        });
    }
  }
}
