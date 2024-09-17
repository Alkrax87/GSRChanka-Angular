import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, doc, updateDoc, addDoc, collection } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-proyect',
  templateUrl: './create-proyect.component.html',
  styleUrl: './create-proyect.component.css'
})
export class CreateProyectComponent {

  proyectoForm: FormGroup;
 
  isEdit: boolean = false;

  constructor(
    public _matDialogRef: MatDialogRef<CreateProyectComponent>,
    private fb: FormBuilder,
    private firestore: Firestore,
    @Inject(MAT_DIALOG_DATA) public data: any // Aquí recibimos los datos del proyecto si es edición
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

    // Si data existe, es porque estamos editando un proyecto
    if (data) {
      this.isEdit = true;
      this.proyectoForm.patchValue(data); // Cargar los datos existentes en el formulario
    }
  }

  // Método para cerrar el modal
  closeModal(): void {
    this._matDialogRef.close();
  }

   // Método para agregar o editar un proyecto
   saveProyecto(): void {
    if (this.proyectoForm.valid) {
      const proyectoData = this.proyectoForm.value;

      if (this.isEdit) {
        // Si es edición, actualizamos el proyecto en Firestore
        const proyectoDocRef = doc(this.firestore, `proyectos/${this.data.id}`);
        updateDoc(proyectoDocRef, proyectoData)
          .then(() => {
            console.log('Proyecto actualizado correctamente');
            this._matDialogRef.close();
          })
          .catch(error => {
            console.error('Error al actualizar el proyecto: ', error);
          });
      } else {
        // Si no es edición, es una creación de nuevo proyecto
        const acoleccion = collection(this.firestore, 'proyectos');
        addDoc(acoleccion, proyectoData)
          .then(() => {
            console.log('Proyecto agregado correctamente');
            this._matDialogRef.close();
          })
          .catch(error => {
            console.error('Error al agregar el proyecto: ', error);
          });
      }
    }
  }
}