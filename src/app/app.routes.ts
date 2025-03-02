import { Routes } from '@angular/router';
import { LoginComponent } from './app-login-usuarios/app-login.component';
import { AppRegisterComponent } from './app-login-usuarios/app-register/app-register.component';
import { AppGestionComponent } from './app-gestion/app-gestion.component';
import { AppGestionListaComponent } from './app-gestion/app-gestion-lista/app-gestion-lista.component';
import { AppModifyComponent } from './app-login-usuarios/app-modify/app-modify.component';

const routeConfig: Routes = [
  {
    path: 'usuarios',
    component: LoginComponent
  },
  {
    path: 'usuarios/gestion',
    component: AppGestionComponent
  },
  {
    path: 'usuarios/register',
    component: AppRegisterComponent
  },
  {
    path: 'usuarios/list',
    component: AppGestionListaComponent
  },
  {
    path: 'usuarios/modify/:idUsuario',
    component: AppModifyComponent
  }
];

export default routeConfig;
