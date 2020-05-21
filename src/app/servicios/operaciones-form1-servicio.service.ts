import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';
import { IIncidenteFormInterface, IDetalleItem, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, delay } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { UserService } from '../login-containers/_services/user.service';

@Injectable()
export class OperacionesForm1ServicioService {
  public availableDetalles = [...Object.values(IncidenteDetallesEnum)];
  public form: FormGroup;
  public mycurrentUser: User;

  private config = {
    apiUrl: 'http://registro.ingenieriac13.cl:4000'
  };

  constructor(
    private operacionesForm1ValidadorService: OperacionesForm1ValidadorService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
    this.form = this.fb.group({
      selectedIncidente: null,
      incidentes: this.fb.array([]),
      detalleeventoOperaciones: this.fb.group({
        fechaEvento: [null, Validators.required],
        responsableEvento: [null, Validators.required],
        atencionEvento: [null, Validators.required],
        obsEvento: [null,],
        produccion: this.fb.group({
          areaProduccion: [null, Validators.required],
          responsableProduccion: [null, Validators.required],
          pgmProduccion: [null, Validators.required],
        })
      })
    }, {
      validator: this.operacionesForm1ValidadorService.formValidator()
    });
  }

  getRegistros(): any {
    return this.getRegistrosInternos()
    .subscribe(data => {
    });
  }

  getRegistrosInternos (): Observable<IIncidenteFormInterface[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
       'Authorization': `Bearer ${this.mycurrentUser['token']}`})
    };
    return this.http.get<IIncidenteFormInterface[]>(this.config.apiUrl + '/formdataOperaciones/recuperarRegistrosAll', httpOptions)
  }

    get incidentesArray(): FormArray {
    return this.form.get('incidentes') as FormArray;
  }

  get isValid(): boolean {
    this.form.setValue({
      selectedIncidente: this.form.value.selectedIncidente,
      incidentes: this.form.value.incidentes,
      detalleeventoOperaciones: {
        fechaEvento: this.form.value.detalleeventoOperaciones.fechaEvento,
        responsableEvento: this.form.value.detalleeventoOperaciones.responsableEvento,
        atencionEvento: this.form.value.detalleeventoOperaciones.atencionEvento,
        obsEvento: this.form.value.detalleeventoOperaciones.obsEvento,
        produccion: { 
          areaProduccion: this.form.value.detalleeventoOperaciones.produccion.areaProduccion,
          responsableProduccion: this.mycurrentUser.nombre + ' ' + this.mycurrentUser.apellido,
          pgmProduccion: this.form.value.detalleeventoOperaciones.produccion.pgmProduccion
        }
      } 
    });
    if (!this.form.valid) {
      this.operacionesForm1ValidadorService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  selectIncidenteForEdit(index: number) {
    this.form.get('selectedIncidente').setValue(index);
  }

  addIncidente(): FormGroup {
    const incidenteGroup = this.getIncidenteFormGroup();
    this.incidentesArray.push(this.getIncidenteFormGroup());

    this.form.markAsDirty();

    return incidenteGroup;
  }

  deleteIncidente(index: number): void {
    this.incidentesArray.removeAt(index);
    this.form.markAsDirty();
  }

  getIncidenteFormGroup(motivo: string = '', descripcion: string = '', impacto: string = '', area: IncidenteAreaEnum = IncidenteAreaEnum.NIVEL1): FormGroup {
    return this.fb.group({
      area: [area],
      motivo: [motivo],
      descripcion: [descripcion],
      impacto: [impacto],
      detalles: this.mapToCheckboxArrayGroup(this.availableDetalles)
    }, {
      validator: this.operacionesForm1ValidadorService.incidenteItemValidator()
    });
  }

  createIncidenteEventoDto(data: IIncidenteFormInterface): IIncidenteFormInterface {
    // const order = {
    const evento = {
      /* detalleeventoOperaciones: data.detalleeventoOperaciones,
      incidentes: data.incidentes */

      // selectedIncidente: this.form.value.selectedIncidente,
      incidentes: data.incidentes,
      detalleeventoOperaciones: {
        fechaEvento: data.detalleeventoOperaciones.fechaEvento,
        responsableEvento: data.detalleeventoOperaciones.responsableEvento,
        atencionEvento: data.detalleeventoOperaciones.atencionEvento,
        obsEvento: data.detalleeventoOperaciones.obsEvento,
        produccion: { 
          areaProduccion: data.detalleeventoOperaciones.produccion.areaProduccion,
          responsableProduccion: this.mycurrentUser.nombre + ' ' + this.mycurrentUser.apellido,
          pgmProduccion: data.detalleeventoOperaciones.produccion.pgmProduccion
        }
      } 
    };

    for (const incidente of evento.incidentes) {
      incidente.detalles = this.getSelectedDetalles(incidente.detalles as IDetalleItem[])
        .map((i) => {
          return i.name;
        });
    }

    this.recordForm(evento, this.mycurrentUser)
    .subscribe(
    evento => {
      // console.log('creando: ' + JSON.stringify(evento));
      this.resetForm();
    },
    err => {
      alert(`Por favor complete los campos obligatorios del Incidente`);
    },
    () =>{
      alert(`Estimado ${this.mycurrentUser.nombre}, evento creado OK`);
    });
    return evento;
  }

  getSelectedDetalles(detalles: IDetalleItem[]): IDetalleItem[] {
    return detalles.filter(i => i.selected);
  }

  resetForm() {
    while (this.incidentesArray.length) {
      this.incidentesArray.removeAt(0);
    }

    this.form.reset();
  }

  recordForm (data: IIncidenteFormInterface, user: User): Observable<IIncidenteFormInterface> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
       'Authorization': `Bearer ${user['token']}`})
    };
    // console.log('COMPONENT DETALLE: ' + JSON.stringify(user))
    return this.http.post<IIncidenteFormInterface>(`${this.config.apiUrl}/formdataOperaciones/crearEventoOperaciones`, data, httpOptions)
      .pipe(
        // catchError(this.handleError('recordForm error: ', data))
        catchError(err => this.handleError(err))
      );
  }

  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
  }
  handleError(error: HttpErrorResponse){
    return throwError(error);
    }

}
