import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { ShowUsuarioComponent } from './show-usuario/show-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  items:any;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(){
    this.userService.getUsers('users').subscribe(data => {
      this.items = data;
    })
  }

  addUserModal(){
    this.dialog.open(CreateUsuarioComponent, {
      width: '500px'
    });
  }

  showUserModal(user:any){
    this.dialog.open(ShowUsuarioComponent, {
      data: user,
      width: '500px'
    });
  }

  editUserModal(user: any){
    this.dialog.open(EditUsuarioComponent, {
      data: user,
      width: '500px'
    });
  }

  removeUserModal(id: string){
    this.dialog.open(DeleteUsuarioComponent, {
      data: id,
      width: '400px'
    });
  }
}