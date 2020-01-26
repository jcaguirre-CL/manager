import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MiMaterialModule } from './material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { Form1Component } from './form1/form1.component';
import { Config1Component } from './config1/config1.component';
import { Historial1Component } from './historial1/historial1.component';

import { CommonModule } from '@angular/common';
import { Opc1OperacionesComponent } from './opc1-operaciones/opc1-operaciones.component';
import { DetalleEventoOperacionesComponent } from './detalle-evento-operaciones/detalle-evento-operaciones.component';
import { DetalleIncidenteOperacionesComponent } from './detalle-incidente-operaciones/detalle-incidente-operaciones.component';
import { ListaIncidentesOperacionesComponent } from './lista-incidentes-operaciones/lista-incidentes-operaciones.component';

import { OperacionesForm1ServicioService } from './servicios/operaciones-form1-servicio.service';

@NgModule({
  declarations: [
    AppComponent,
    Form1Component,
    InicioComponent,
    Config1Component,
    Historial1Component,
    Opc1OperacionesComponent,
    DetalleEventoOperacionesComponent,
    DetalleIncidenteOperacionesComponent,
    ListaIncidentesOperacionesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MiMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [OperacionesForm1ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
