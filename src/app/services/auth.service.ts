import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth:Auth, private firebase: Firestore, private router:Router) { }

  async register(name:string, lastname:string, rol:string, email:string, password:string):Promise<void> {
    try {
      // Registro Usuario
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('Usuario registrado:', userCredential.user);

      // Registramos valores del Usuario
      const userRef = collection(this.firebase, 'users');
      await addDoc(userRef, {
        name: name,
        lastname: lastname,
        rol: rol,
        user: email.replace('@gsrchanka.com',''),
        id: userCredential.user.uid
      });
    } catch (error) {
      throw error;
    }
  }

  async login(user: string, password: string){
    const auth = getAuth();
    try {
      // Intentar Login
      const userCredential = await signInWithEmailAndPassword(auth, user, password);

      // SessionData
      const usersRef = collection(this.firebase, 'users');
      const q = query(usersRef, where('id', '==', userCredential.user.uid));
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs[0].data();
      sessionStorage.setItem('user', JSON.stringify(userData));

      // Redirección
      this.router.navigate(['/portal/home']);
    } catch (error) {
      throw error;
    }
  }

  async logout(){
    const auth = getAuth();
    try {
      // Cerrar sesión
      await signOut(auth);

      // Limpiar datos del SessionStorage
      sessionStorage.removeItem('user');

      // Redirección
      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }
}