import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent {
  searchTerm: string = '';
  isLoading: boolean = false;
  searchSuccess: boolean = false;
  document: any;

  onSearch(): void {
    if (this.searchTerm.trim() === '') return;

    this.isLoading = true;

    // Simular búsqueda con un tiempo de carga
    setTimeout(() => {
      this.isLoading = false;
      console.log('Resultado para:', this.searchTerm);
      this.document = this.searchDocument(this.searchTerm);
      console.log(this.document);
    }, 1000);
  }

  searchDocument(seach: string){
    if (seach === 'doc123') {
      this.searchSuccess = true;
      return {
        id: "DOC123",
        name: "Documento Prueba",
        phases: [
          { name: 'Fase 1', status: 'completed' },
          { name: 'Fase 2', status: 'completed' },
          { name: 'Fase 3', status: 'in_progress' },
          { name: 'Fase 4', status: 'review' },
          { name: 'Fase 5', status: 'pending' },
          { name: 'Fase 6', status: 'pending' },
          { name: 'Fase 7', status: 'pending' },
        ]
      }
    } else {
      return null
    }
  }

  resetSearch() {
    this.searchTerm = '';
    this.searchSuccess = false;
    this.document = null;
  }


}
//   trackingCode: string = '';
//   trackingForm: FormGroup;
//   isLoading = false;
//   error: string | null = null;
//   document: Document | null = null;

//   constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
//     this.trackingForm = this.fb.group({
//       trackingCode: ['DOC123']
//     });
//   }

//   searchDocument(trackingCode: string): Observable<Document | null> {
//   return new Observable<Document>(observer => {
//     // Simula un retraso de 1.5 segundos
//     setTimeout(() => {
//       console.log(trackingCode);
      
//       if (trackingCode === 'DOC123') {
//         observer.next({
//           id: 'DOC123',
//           phases: [
//             { name: 'Submission', status: 'completed' },
//             { name: 'Review', status: 'completed' },
//             { name: 'Approval', status: 'in_progress' },
//             { name: 'Archiving', status: 'pending' }
//           ]
//         });
//         observer.complete(); // Indica que la emisión ha terminado
//       } else {
//         observer.error('Document not found'); // Emite un error si no se encuentra el documento
//       }
//     }, 1500); // Simula el tiempo de espera
//   }).pipe(
//     catchError(err => {
//       this.error = err; // Captura el error y lo establece en el estado
//       return of(null); // Devuelve un observable vacío en caso de error
//     })
//   );
// }


//   handleSearch() {
//     this.isLoading = true;
//     this.error = null;
//     this.document = null;

//     const trackingCode = this.trackingForm.get('trackingCode')?.value;

//     this.searchDocument(trackingCode).subscribe({
//       next: (result) => {
//         this.document = result;
//         this.isLoading = false;
//       },
//       error: (err) => {
//         this.isLoading = false;
//         this.openSnackBar('Document not found. Please check the tracking code and try again.');
//       }
//     });
//   }

//   resetSearch() {
//     this.trackingForm.reset();
//     this.document = null;
//     this.error = null;
//   }

//   openSnackBar(message: string) {
//     this.snackBar.open(message, 'Close', { duration: 3000 });
//   }
