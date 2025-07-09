import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private firebase: Firestore) { }

  getUsers(collectionName: string): Observable<any[]> {
    const acoleccion = collection(this.firebase,collectionName)
    return collectionData(acoleccion, { idField: 'id' })
  }

  async addUser(formData:FormGroup){
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, formData.value.username + '@gsrchanka.com', formData.value.password);
      const userRef = collection(this.firebase, 'users');
      addDoc(userRef, {
        name: formData.value.name,
        lastname: formData.value.lastname,
        rol: formData.value.rol,
        user: formData.value.username.replace('@gsrchanka.com',''),
        id: userCredential.user.uid
      });
      console.log("Usuario Agregado");
    } catch (error) {
      console.log("Error al agregar Usuario");
    }
  }

  async editUser(formData:FormGroup, data:any){
    const userRef = doc(this.firebase, `users/${data.id}`)
    console.log(formData.value.password);
    updateDoc(userRef, formData.value).then(() => {
      console.log("Usuario Actualizado");
    }).catch(error => {
      console.log("Error al actualizar Usuario");
    })
  }

  async deleteUser(id: string){
    const userRef = doc(this.firebase, `users/${id}`)
    deleteDoc(userRef).then(() => {
      console.log("Usuario Eliminado");
    }).catch(error => {
      console.log("Error al eliminar Usuario");
    })
  }
}