import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HomeComponent } from './components/main/home/home.component';
import { AreasComponent } from './components/main/areas/areas.component';
import { ProyectosComponent } from './components/main/proyectos/proyectos.component';
import { TramiteComponent } from './components/main/tramite/tramite.component';
import { UsuariosComponent } from './components/main/usuarios/usuarios.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'areas', component: AreasComponent },
  { path: 'proyectos', component: ProyectosComponent },
  { path: 'tramite', component: TramiteComponent },
  { path: 'usuarios', component: UsuariosComponent },
  {
    path: 'portal', component: SidebarComponent, canActivate:[authGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: 'areas', component: AreasComponent },
      { path: 'tramites', component: TramiteComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
