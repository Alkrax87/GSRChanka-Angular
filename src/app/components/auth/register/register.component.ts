import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  userModel = {
    name:'',
    lastname:'',
    rol:'',
    user: '',
    password: ''
  }

  constructor(private firestore: Firestore, private router: Router) {}

  async registerUser(form: NgForm) {
    if (form.valid) {
      try {
        // Cifrado
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.userModel.password, salt);

        // Referencia a la colección
        const userRef = collection(this.firestore, 'users');

        // Guardar el usuario
        await addDoc(userRef, {
          name: this.userModel.name,
          lastname: this.userModel.lastname,
          rol: this.userModel.rol,
          user: this.userModel.user,
          password: hashedPassword
        });

        // Redirigir a la página de login o dashboard
        this.router.navigate(['']);
      } catch (error) {
        console.error('Error registrando el usuario:', error);
      }
    }
  }
}