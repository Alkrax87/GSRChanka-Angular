import { Component, Inject } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrl: './delete-usuario.component.css'
})
export class DeleteUsuarioComponent {
  errorMessage: string | null = null;

  constructor(private userService:UserService, public dialog: MatDialogRef<DeleteUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {}

  deleteUser(){
    try {
      this.userService.deleteUser(this.data);
      this.dialog.close();
    } catch (error:any) {
      throw error;
    }
  }

  close(){
    this.dialog.close();
  }
}