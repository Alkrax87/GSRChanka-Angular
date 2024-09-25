import { Component, inject} from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Observable, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms'; // Importa FormControl
import { map, startWith } from 'rxjs/operators'; // Importa operadores de RxJS
import { CreateProyectComponent } from './create-proyect/create-proyect.component';
import { DeletProyectComponent } from './delet-proyect/delet-proyect.component';
import { deleteDoc, doc } from '@angular/fire/firestore'; // Importa deleteDoc y doc
import { EditarProyectComponent } from './editar-proyect/editar-proyect.component';
import { ShowProyectComponent } from './show-proyect/show-proyect.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent {
  firebase: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  searchControl = new FormControl(''); // Control para manejar el valor del input de búsqueda
  
  //sortDirection: { [key: string]: boolean } = {}; // Para controlar la dirección de ordenamiento
  sortField: string = ''; // Campo actual de ordenación
  sortDirection: 'asc' | 'desc' = 'asc'; // Dirección actual de la ordenación

  filteredItems: any[] = [];  // Para almacenar los proyectos filtrados
  currentPage: number = 1;    // Página actual
  pageSize: number = 5;       // Tamaño de página (número de proyectos por página)
  paginatedItems: any[] = []; // Para almacenar los proyectos paginados
  
  pageSizeOptions = [5, 10, 15, 20]; // Opciones de número de proyectos por página

  constructor(private _matDialog: MatDialog) {
    const acoleccion = collection(this.firebase, 'proyectos');
    this.items$ = collectionData(acoleccion, { idField: 'id' });

    //Metodo Filtrar busqueda de un proyecto
  combineLatest([
    this.items$,
    this.searchControl.valueChanges.pipe(startWith(''))  // Empieza con búsqueda vacía
  ]).pipe(
    map(([projects, searchText]) => {
      const searchValue = searchText ? searchText.toLowerCase() : '';
      
      // Filtra los proyectos según el texto de búsqueda
      const filtered = projects.filter(proyecto => 
        proyecto.nombreInversion.toLowerCase().includes(searchValue) || 
        proyecto.nivelInversion.toLowerCase().includes(searchValue) || 
        proyecto.estadoInversion.toLowerCase().includes(searchValue) || 
        proyecto.idUsuario.toLowerCase().includes(searchValue) || 
        proyecto.provinciaInversion.toLowerCase().includes(searchValue) || 
        proyecto.distritoInversion .toLowerCase().includes(searchValue) || 
        proyecto.nivelInversion.toLowerCase().includes(searchValue) || 
        proyecto.funcionInversion.toLowerCase().includes(searchValue) || 
        proyecto.modalidadInversion.toLowerCase().includes(searchValue) || 
        proyecto.presupuestoFormulacionInversion.toLowerCase().includes(searchValue) || 
        proyecto.presupuestoEjecucionInversion.toLowerCase().includes(searchValue) 
      );
      return filtered;
    })
  ).subscribe(filteredProjects => {
    this.filteredItems = filteredProjects;
    this.setPage(1);  // Reseteamos a la página 1 cuando se actualizan los filtros
  });
}

// Método para establecer la página actual y obtener los proyectos paginados
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.filteredItems.slice(startIndex, endIndex); // Proyectos paginados
  }

//Metodo para seleccionar cantidad de proyectos en una pagina
  changePageSize(event: Event) {
    const newPageSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newPageSize, 10);  // Asegúrate de convertir el valor a número
    this.setPage(1);  // Reseteamos a la primera página
  }

  // Método para obtener el número total de páginas
  get totalPages(): number {
    return Math.ceil(this.filteredItems.length / this.pageSize);
  }

 // Método para generar el texto dinámico en la tabla
  get pageText(): string {
    const totalPages = Math.ceil(this.filteredItems.length / this.pageSize);
    return `Mostrando página ${this.currentPage} de ${totalPages} con ${this.filteredItems.length} proyectos en total.`;
  }

  // Método para manejar la ordenación de la tabla
  sortData(field: string) {
  if (this.sortField === field) {
    // Si estamos ordenando el mismo campo, cambiamos la dirección
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    // Si cambiamos de campo, ordenamos de manera ascendente
    this.sortField = field;
    this.sortDirection = 'asc';
  }

  this.filteredItems.sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];

    // Comprobamos si el campo es una fecha (puedes ajustar esta condición según tu estructura)
    const isDateField = field.includes('fecha');

    if (isDateField) {
      // Convertimos los valores a fechas si es un campo de tipo fecha
      const dateA = new Date(aValue);
      const dateB = new Date(bValue);
      return this.sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    } else {
      // Para campos de texto, hacemos la comparación alfabética
      const compareA = aValue.toString().toLowerCase();
      const compareB = bValue.toString().toLowerCase();
      if (compareA < compareB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (compareA > compareB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    }
  });

  this.setPage(1); // Reiniciamos la paginación al cambiar el orden
  }

  // Método para obtener el icono de ordenación
  getSortIcon(field: string): string {
  if (this.sortField === field) {
    return this.sortDirection === 'asc' ? 'bi-caret-up-fill' : 'bi-caret-down-fill';
  }
  return 'bi-diamond'; // El rombo se muestra cuando no hay orden activo en esa columna
  }
  //Modal para abrir el Create-proyecto
  abrirModalCreate(): void {
    this._matDialog.open(CreateProyectComponent, {
      width: '700px'
    });
  }
  //Modal para abrir el Editar-Proyecto
  abrirModalEditar(proyecto: any): void {
    this._matDialog.open(EditarProyectComponent, {
      width: '700px',
      data: proyecto // Pasar los datos del proyecto al modal de edición
    });
  }
  //Metodo para Show
  abrirModalMostrar(proyecto: any): void {
    this._matDialog.open(ShowProyectComponent, {
      width: '700px',
      data: proyecto // Pasar los datos del proyecto al modal
    });
  }
  //Metodo eliminar un proyecto
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
