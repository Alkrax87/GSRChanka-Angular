import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent {
  usuarioForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialogRef<EditUsuarioComponent>, @Inject(MAT_DIALOG_DATA) public data:any) {
    this.usuarioForm = this.fb.group({
      name: [data.name, Validators.required],
      lastname: [data.lastname, Validators.required],
      rol: [data.rol, Validators.required],
      username: [data.user, Validators.required],
      password: [data.password]
    })
  }

  editUser() {
    if (this.usuarioForm.invalid) {
      this.errorMessage = 'Por favor ingresa un correo y una contraseña válidos.';
    }
    try {
      this.userService.editUser(this.usuarioForm, this.data);
      this.close();
    } catch (error:any) {
      throw error;
    }
  }

  close(){
    this.dialog.close();
  }
}