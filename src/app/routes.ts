import { Routes } from '@angular/router';
import { AppLoginComponent } from './app-login/app-login.component';
import { AppRegisterComponent } from './app-register/app-register.component';
import { AppGestionComponent } from './app-gestion/app-gestion.component';
import { AppGestionListaComponent } from './app-gestion/app-gestion-lista/app-gestion-lista.component';
import { AppModifyComponent } from './app-modify/app-modify.component';
import { AuthGuard } from './login-service/auth.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: AppLoginComponent
  },
  {
    path: 'gestion',
    component: AppGestionComponent,
    canActivate: [AuthGuard] // Protegida
  },
  {
    path: 'register',
    component: AppRegisterComponent
  },
  {
    path: 'list',
    component: AppGestionListaComponent,
    canActivate: [AuthGuard] // Protegida
  },
  {
    path: 'modify',
    component: AppModifyComponent,
    canActivate: [AuthGuard] // Protegida
  }
];

export default routeConfig;
