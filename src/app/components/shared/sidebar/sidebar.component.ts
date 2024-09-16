import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
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
          icon: 'fas fa-users'
        },
        {
          id: 'roles',
          label: 'Roles',
          icon: 'fas fa-user-shield'
        },
        {
          id: 'extras',
          label: 'Extras',
          icon: 'fas fa-users-cog'
        },
      ]
    },
    {
      category: "Gestión",
      items: [
        {
          id: 'areas',
          label: 'Areas',
          icon: 'fas fa-building',
          subItems: ['Estado', 'Otros']
        },
        {
          id: 'proyectos',
          label: 'Proyectos',
          icon: 'fas fa-project-diagram',
          subItems: ['Planificación', 'Proceso', 'Finalizado']
        },
        {
          id: 'tramite',
          label: 'Trámite',
          icon: 'fas fa-file-signature',
          subItems: ['Seguimiento','Recientes', 'Proceso', 'Finalizados', 'Historial']
        },
      ]
    },
    {
      category: "Almacén",
      items: [
        {
          id: 'almacen',
          label: 'Almacén',
          icon: 'fas fa-warehouse',
          subItems: ['Ubicación', 'Materiales']
        },
        { id: 'reportes',
          label: 'Reportes',
          icon: 'fas fa-list-alt'
        },
      ]
    },
  ];
}
