import { Component, inject } from '@angular/core';
import { Firestore,collection,collectionData, addDoc,getDocs, query} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CreateProyectComponent } from './create-proyect/create-proyect.component';
import { DeletProyectComponent } from './delet-proyect/delet-proyect.component';
import { deleteDoc, doc } from '@angular/fire/firestore'; // Importa deleteDoc y doc
import { Grid,  h  } from 'gridjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  firebase:Firestore = inject(Firestore);
  items$:Observable<any[]>
  data:any;
  constructor(private _matDialog: MatDialog){
    const acoleccion = collection(this.firebase,"proyectos");
    this.items$ = collectionData(acoleccion, { idField: 'id' });
  }
  async getRobots() {
    return (
     await getDocs(query(collection(this.firebase, 'proyectos')))
    ).docs.map((robots) => robots.data());
   }
  /*prueba(){
    const acoleccion = collection(this.firebase,"proyectos");
    this.items$ = collectionData(acoleccion, { idField: 'id' });
  }*/
   //Abrir modal de creación
   abrirModal(): void {
    const dialogRef = this._matDialog.open(CreateProyectComponent, {
      width: '700px'
    });

    // Cerrar el modal y actualizar el grid cuando se agregue un nuevo proyecto
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Re-renderizamos el grid al cerrar el modal, si se agregó un nuevo proyecto
        this.updateGrid();
      }
    });
  }

  ngOnInit(): void {
    this.data = this.getRobots();
    console.log(this.data);
    console.log(this.items$);
    this.updateGrid();  // Renderizamos el grid al inicializar el componente
  }

  // Método para renderizar el grid dinámicamente cuando los datos cambian
  private updateGrid(): void {
    const gridElement = document.getElementById('grid');

    // Suscribirnos a los datos de Firestore y renderizar el grid
    this.items$.pipe(
      map(proyectos => proyectos.map(proyecto => [
        proyecto.cuiInversion, 
        proyecto.nombreInversion, 
        proyecto.idUsuario, 
        proyecto.provinciaInversion, 
        proyecto.distritoInversion, 
        proyecto.nivelInversion, 
        proyecto.funcionInversion, 
        proyecto.modalidadInversion, 
        proyecto.estadoInversion, 
        proyecto.fechaInicioInversion, 
        proyecto.fechaFinalInversion, 
        proyecto.presupuestoFormulacionInversion, 
        proyecto.presupuestoEjecucionInversion,
          // Botón de editar
         
          // Botón de eliminar
          h('button', {
            className: 'btn btn-danger btn-sm',
            onClick: () => this.eliminarProyecto(proyecto.id)
          }, 'Eliminar')
        
      ]))
    ).subscribe(proyectosData => {
      if (gridElement) {
        // Limpiar el grid existente
        gridElement.innerHTML = '';

        // Renderizar el nuevo grid con los datos actualizados
        new Grid({
          columns: ['CUI', 'Nombre', 'Responsable', 'Provincia', 'Distrito', 'Nivel', 'Función', 'Modalidad', 'Estado', 'Fecha Inicio', 'Fecha Final', 'Presupuesto Formulación', 'Presupuesto Ejecución',
            { name: 'Editar', width: '100px' },
            { name: 'Eliminar', width: '100px' }
          ],
          data: proyectosData,  // Datos dinámicos del observable
          pagination: true,
          search: true,
          sort: true,
        }).render(gridElement);
      } else {
        console.error('El elemento con id "grid" no fue encontrado');
      }
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
