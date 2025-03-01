import { Routes } from '@angular/router';
import { LoginComponent } from './app-login/app-login.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { AppGestionComponent } from './app-gestion/app-gestion.component';
import { AppGestionListaComponent } from './app-gestion/app-gestion-lista/app-gestion-lista.component';
import { AppModifyComponent } from './app-modify/app-modify.component';

const routeConfig: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'gestion',
    component: AppGestionComponent
  },
  {
    path: 'register',
    component: AppRegisterComponent
  },
  {
    path: 'list',
    component: AppGestionListaComponent
  },
  {
    path: 'modify',
    component: AppModifyComponent
  }
];

export default routeConfig;
