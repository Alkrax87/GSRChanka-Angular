import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/main/home/home.component';
import { ProyectosComponent } from './components/main/proyectos/proyectos.component';
import { UsuariosComponent } from './components/main/usuarios/usuarios.component';
import { AreasComponent } from './components/main/areas/areas.component';
import { TramiteComponent } from './components/main/tramite/tramite.component';

// Environments
import { environment } from '../environments/environment.development';

// Providers Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth'

import { CreateProyectComponent } from './components/main/proyectos/create-proyect/create-proyect.component';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditarProyectComponent } from './components/main/proyectos/editar-proyect/editar-proyect.component';
import { DeletProyectComponent } from './components/main/proyectos/delet-proyect/delet-proyect.component';
import { RolesComponent } from './components/main/roles/roles.component';
import { SeguimientoComponent } from './components/main/tramite/seguimiento/seguimiento.component';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';
import { LottieAnimationComponent } from "./components/shared/lottie-animation/lottie-animation.component";
import { ShowProyectComponent } from './components/main/proyectos/show-proyect/show-proyect.component';
import { CreateAreaComponent } from './components/main/areas/create-area/create-area.component';
import { EditAreaComponent } from './components/main/areas/edit-area/edit-area.component';
import { DeleteAreaComponent } from './components/main/areas/delete-area/delete-area.component';
import { ShowAreaComponent } from './components/main/areas/show-area/show-area.component';
import { ShowTramiteComponent } from './components/main/tramite/show-tramite/show-tramite.component';
import { EditTramiteComponent } from './components/main/tramite/edit-tramite/edit-tramite.component';
import { CreateTramiteComponent } from './components/main/tramite/create-tramite/create-tramite.component';
import { DeleteTramiteComponent } from './components/main/tramite/delete-tramite/delete-tramite.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    RegisterComponent,
    ProyectosComponent,
    UsuariosComponent,
    AreasComponent,
    TramiteComponent,
    CreateProyectComponent,
    EditarProyectComponent,
    DeletProyectComponent,
    RolesComponent,
    SeguimientoComponent,
    ShowProyectComponent,
    CreateAreaComponent,
    EditAreaComponent,
    DeleteAreaComponent,
    ShowAreaComponent,
    ShowTramiteComponent,
    EditTramiteComponent,
    CreateTramiteComponent,
    DeleteTramiteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    LottieAnimationComponent,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAuth(() => getAuth()),
    provideLottieOptions({ player: () => player }),
    provideCacheableAnimationLoader(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
