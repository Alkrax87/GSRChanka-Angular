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
import { RolesComponent } from './components/main/roles/roles.component';
import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { SeguimientoComponent } from './components/main/tramite/seguimiento/seguimiento.component';

const redirectLoggedIn = () => redirectLoggedInTo(['portal/home']);
const redirectUnauthorizedUser = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[AuthGuard],
    data: { authGuardPipe: redirectLoggedIn }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[AuthGuard],
    data: { authGuardPipe: redirectLoggedIn }
  },
  {
    path: 'seguimiento',
    component: SeguimientoComponent,
    canActivate:[AuthGuard],
    data: { authGuardPipe: redirectLoggedIn }
  },
  {
    path: 'portal',
    component: SidebarComponent,
    canActivate:[AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedUser },
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'areas', component: AreasComponent },
      { path: 'tramites', component: TramiteComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
