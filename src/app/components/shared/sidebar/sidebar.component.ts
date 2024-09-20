import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // User Info
  userName: string | null = null;
  userRol: string | null = null;

  ngOnInit(){
    const user = localStorage.getItem('user');
    if (user){
      this.userName = JSON.parse(user).name + ' ' + JSON.parse(user).lastname;
      this.userRol = JSON.parse(user).rol;
    }
  }

  // Logout
  router = inject(Router);
  logout(){
    localStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  openMenus: Record<string, boolean> = {};
  isCollapsed = false;

  toggleMenu(menuId: string) {
    if (!this.isCollapsed) {
      this.openMenus[menuId] = !this.openMenus[menuId];
    }
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  menuCategories = [
    {
      category: "Admin",
      items: [
        {
          id: 'usuarios',
          label: 'Usuarios',
          icon: 'fas fa-users',
          route: '/portal/usuarios',
          subItems: []
        },
        {
          id: 'roles',
          label: 'Roles',
          icon: 'fas fa-user-shield',
          route: '/portal/usuarios',
          subItems: []
        }
      ]
    },
    {
      category: "Gestion",
      items: [
        {
          id: 'areas',
          label: 'Areas',
          icon: 'fas fa-building',
          route: '/portal/areas',
          subItems: []
        },
        {
          id: 'proyectos',
          label: 'Proyectos',
          icon: 'fas fa-project-diagram',
          route: '/portal/proyectos',
          subItems: []
        },
        {
          id: 'tramites',
          label: 'Trámites',
          icon: 'fas fa-file-invoice',
          route: '/portal/tramites',
          subItems: []
        }
      ]
    },
    {
      category: "Otros",
      items: [
        {
          id: 'almacen',
          label: 'Almacén',
          icon: 'fas fa-building',
          route:'',
          subItems: ['Estado', 'Otros']
        },
        {
          id: 'tramite',
          label: 'Trámite',
          icon: 'fas fa-file-signature',
          subItems: ['Seguimiento','Recientes', 'Proceso', 'Finalizados', 'Historial']
        },
      ]
    }
  ];
}