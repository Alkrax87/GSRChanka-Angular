import { Component, inject } from '@angular/core';
import { Firestore,collection,collectionData} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateProyectComponent } from './create-proyect/create-proyect.component';
import { DeletProyectComponent } from './delet-proyect/delet-proyect.component';
import { deleteDoc, doc } from '@angular/fire/firestore'; // Importa deleteDoc y doc
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  firebase:Firestore = inject(Firestore);
  items$:Observable<any[]>
  constructor(private _matDialog: MatDialog){
    const acoleccion = collection(this.firebase,"proyectos");
    this.items$ = collectionData(acoleccion, { idField: 'id' });
  }
  //Abrir modal de creacion
  abrirModal():void{
    this._matDialog.open(CreateProyectComponent, {
      width: '700px'
    })
  }
  // Abrir el modal de edición con los datos del proyecto
  editarProyecto(proyectos: any): void {
    this._matDialog.open(CreateProyectComponent, {
      width: '700px',
      data: proyectos // Pasamos el proyecto al modal para edición
    });
  }

  eliminarProyecto(id: string): void {
    const dialogRef = this._matDialog.open(DeletProyectComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const proyectoDocRef = doc(this.firebase, `proyectos/${id}`);
        deleteDoc(proyectoDocRef)
          .then(() => {
            console.log('Proyecto eliminado correctamente');
          })
          .catch(error => {
            console.error('Error al eliminar el proyecto: ', error);
          });
      }
    });
  }

}
