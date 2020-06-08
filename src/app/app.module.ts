import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MiMaterialModule } from './material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Form1Component } from './form1/form1.component';
import { Config1Component } from './config1/config1.component';
import { Historial1Component } from './historial1/historial1.component';
import { AlertComponent } from './login-containers/_components';

import { JwtInterceptor, ErrorInterceptor } from './login-containers/_helpers';

import { CommonModule } from '@angular/common';
import { Opc1OperacionesComponent } from './opc1-operaciones/opc1-operaciones.component';
import { DetalleEventoOperacionesComponent } from './detalle-evento-operaciones/detalle-evento-operaciones.component';
import { DetalleIncidenteOperacionesComponent } from './detalle-incidente-operaciones/detalle-incidente-operaciones.component';
import { ListaIncidentesOperacionesComponent } from './lista-incidentes-operaciones/lista-incidentes-operaciones.component';

import { OperacionesForm1ServicioService } from './servicios/operaciones-form1-servicio.service';
import { IncidenteAreaPickerComponent } from './incidente-area-picker/incidente-area-picker.component';
import { FormportatilComponent } from './formportatil/formportatil.component';
import { FormedicionComponent } from './formedicion/formedicion.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Form1Component,
    InicioComponent,
    RegisterComponent,
    Config1Component,
    Historial1Component,
    Opc1OperacionesComponent,
    DetalleEventoOperacionesComponent,
    DetalleIncidenteOperacionesComponent,
    ListaIncidentesOperacionesComponent,
    IncidenteAreaPickerComponent,
    AlertComponent,
    FormportatilComponent,
    FormedicionComponent
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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    OperacionesForm1ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
