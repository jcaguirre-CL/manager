import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './login-containers/_helpers';


import { Form1Component } from './form1/form1.component';
import { Config1Component } from './config1/config1.component';
import { Historial1Component } from './historial1/historial1.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'form1', component: Form1Component, canActivate: [AuthGuard] },
  { path: 'historial1', component: Historial1Component, canActivate: [AuthGuard] },
  { path: 'config1', component: Config1Component, canActivate: [AuthGuard] },
  { path: '**', redirectTo: ''},
];

export const AppRoutingModule = RouterModule.forRoot(routes);
/* 
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
 */