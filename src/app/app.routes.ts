import { Routes } from '@angular/router';

// Importar los componentes de Usuario
import { LoginComponentUsers } from './app-login-usuarios/app-login.component';
import { GestionComponentUsers } from './app-login-usuarios/app-gestion/app-gestion.component';
import { GestionListaComponentUsers } from './app-login-usuarios/app-gestion/app-gestion-lista/app-gestion-lista.component';
import { ModifyComponentUsers } from './app-login-usuarios/app-modify/app-modify.component';
import { RegisterComponentUsers } from './app-login-usuarios/app-register/app-register.component';
import { LoginComponentClientes } from './app-login-clientes/app-login.component';
import { LoginComponentVehiculos } from './app-login-vehiculos/app-login.component';
import { AppClientsListComponent } from './app-login-clientes/app-gestion/app-gestion.component';
import { AppRegisterClientComponent } from './app-login-clientes/app-register/app-register.component';
import { ModifyClientsComponent } from './app-login-clientes/app-modify/app-modify.component';
import { GestionVehiculosComponent } from './app-login-vehiculos/app-gestion/app-gestion.component';
import { ModifyComponentVehiculos } from './app-login-vehiculos/app-modify/app-modify.component';
import { RegistroComponentVehiculos } from './app-login-vehiculos/app-register/app-register.component';
import { SampleCustomerComponent } from './app-promocion-vehiculos/app-promocion.component';
import { LoginComponentOrdenCompra } from './app-orden-compra/app-login.component';
import { AppOrdencComponent } from './app-orden-compra/app-ordenc/app-ordenc.component';
import { AppImpuestosComponent } from './app-impuestos/app-impuestos.component';

const routeConfig: Routes = [
  {
    path: 'usuarios',
    component: LoginComponentUsers
  },
  {
    path: 'usuarios/gestion',
    component: GestionComponentUsers
  },
  {
    path: 'usuarios/register',
    component: RegisterComponentUsers
  },
  {
    path: 'usuarios/list',
    component: GestionListaComponentUsers
  },
  {
    path: 'usuarios/modify/:idUsuario',
    component: ModifyComponentUsers
  },
  {
    path: 'clientes',
    component: LoginComponentClientes
  },
  {
    path: 'clientes/gestion',
    component: AppClientsListComponent
  },
  {
    path: 'clientes/register',
    component: AppRegisterClientComponent
  },
  {
    path: 'clientes/modify/:idCliente',
    component: ModifyClientsComponent
  },
  {
    path: 'vehiculos',
    component: LoginComponentVehiculos
  },
  {
    path: 'vehiculos/gestion',
    component: GestionVehiculosComponent
  },
  {
    path: 'vehiculos/modify/:idVehiculo',
    component: ModifyComponentVehiculos
  },
  {
    path: 'vehiculos/register',
    component: RegistroComponentVehiculos
  },
  {
    path: '',
    component: SampleCustomerComponent
  },
  {
    path: 'ordenCompra',
    component: LoginComponentOrdenCompra
  },
  {
    path: 'ordenCompra/venta',
    component: AppOrdencComponent
  },
  {
    path: 'impuestos', 
    component: AppImpuestosComponent
  }
];

export default routeConfig;
