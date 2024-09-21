import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  async registerUser() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor ingresa un correo y una contraseña válidos.';
    }

    const { name, lastname, rol, username, password } = this.registerForm.value;

    try {
      await this.authService.register(name, lastname, rol, username + '@gsrchanka.com', password);
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
}