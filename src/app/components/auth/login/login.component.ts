import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  async loginUser() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor ingresa un usuario y una contraseña.';
    }

    const { username, password } = this.loginForm.value;

    try {
      await this.authService.login(username + '@gsrchanka.com', password);
    } catch (error:any) {
      if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'La contraseña es incorrecta.';
      } else if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'El usuario no existe.';
      } else {
        this.errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
      }
    }
  }
}