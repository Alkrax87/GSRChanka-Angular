import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrl: './create-usuario.component.css'
})
export class CreateUsuarioComponent {
  usuarioForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private fb: FormBuilder, public dialog: MatDialogRef<CreateUsuarioComponent>) {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      rol: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [ Validators.required, Validators.minLength(8)]]
    })
  }

  addUser(){
    if (this.usuarioForm.invalid) {
      this.errorMessage = 'Por favor ingresa un correo y una contraseña válidos.';
    }
    try {
      this.userService.addUser(this.usuarioForm);
      this.close();
    } catch (error:any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          this.errorMessage = 'El correo electrónico ya está en uso.';
          break;
        case 'auth/invalid-email':
          this.errorMessage = 'El usuario ingresado no es válido.';
          break;
        default:
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
      }
    }
  }

  close(){
    this.dialog.close();
  }
}