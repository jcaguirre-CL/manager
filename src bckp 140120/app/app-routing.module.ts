import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Form1Component } from './form1/form1.component';
import { Config1Component } from './config1/config1.component';
import { Historial1Component } from './historial1/historial1.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'form1', component: Form1Component },
  { path: 'historial1', component: Historial1Component },
  { path: 'config1', component: Config1Component },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
