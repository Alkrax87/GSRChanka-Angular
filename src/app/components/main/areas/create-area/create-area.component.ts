import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.css'
})
export class CreateAreaComponent {
  proyectoForm: FormGroup;
 
  firebase: Firestore;

  

  constructor(
    public _matDialogRef: MatDialogRef<CreateAreaComponent>,
    private fb: FormBuilder,
    private firestore: Firestore
  ) 
  {
    this.proyectoForm = this.fb.group({
      nombreArea: ['', Validators.required],
      idUsuario: ['', Validators.required],
      nroEmpleados: ['', Validators.required],
      Observaciones: ['', Validators.required],
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
      const areasRef = collection(this.firebase, 'areas');
      addDoc(areasRef, this.proyectoForm.value)
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
