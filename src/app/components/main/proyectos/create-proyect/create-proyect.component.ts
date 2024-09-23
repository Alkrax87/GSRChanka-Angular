import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-proyect',
  templateUrl: './create-proyect.component.html',
  styleUrl: './create-proyect.component.css'
})
export class CreateProyectComponent {

  proyectoForm: FormGroup;
 
  firebase: Firestore;

  

  constructor(
    public _matDialogRef: MatDialogRef<CreateProyectComponent>,
    private fb: FormBuilder,
    private firestore: Firestore
  ) 
  {
    this.proyectoForm = this.fb.group({
      cuiInversion: ['', [
        Validators.required,
        Validators.maxLength(3)
      ]],
      nombreInversion: ['', Validators.required],
      idUsuario: ['', Validators.required],
      provinciaInversion: ['', Validators.required],
      distritoInversion: ['', Validators.required],
      nivelInversion: ['', Validators.required],
      funcionInversion: ['', Validators.required],
      modalidadInversion: ['', Validators.required],
      estadoInversion: ['', Validators.required],
      fechaInicioInversion: ['', Validators.required],
      fechaFinalInversion: ['', Validators.required],
      presupuestoFormulacionInversion: ['', Validators.required],
      presupuestoEjecucionInversion: ['', Validators.required],
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
      const proyectosRef = collection(this.firebase, 'proyectos');
      addDoc(proyectosRef, this.proyectoForm.value)
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