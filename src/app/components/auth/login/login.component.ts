import { Component } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    user: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private firestore: Firestore, private router: Router) {}

  async loginUser() {
    try {
      // Crear una consulta
      const usersRef = collection(this.firestore, 'users');
      const q = query(usersRef, where('user', '==', this.credentials.user));
      const querySnapshot = await getDocs(q);

      // Verificar si se encontró un usuario
      if (querySnapshot.empty) {
        this.errorMessage = 'Usuario no encontrado';
        return;
      }

      // Obtener el usuario de Firestore
      let userData: any = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      // Comprobar la contraseña
      const isMatch = await bcrypt.compare(this.credentials.password, userData.password);
      if (isMatch) {
        localStorage.setItem('user', JSON.stringify(userData));
        this.router.navigate(['/portal/home']);
      } else {
        this.errorMessage = 'Contraseña incorrecta';
      }
    } catch (error) {
      console.error('Error en el login:', error);
      this.errorMessage = 'Ocurrió un error. Inténtalo de nuevo.';
    }
  }
}