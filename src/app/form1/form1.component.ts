import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { first } from 'rxjs/operators';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1LoaderService } from '../servicios/operaciones-form1-loader.service';
import { DEMO_INCIDENTE } from '../servicios/demo-incidente-item';
import { AlertService } from '../login-containers/_services/alert.service';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

export interface State {
  flag: string;
  name: string;
  population: string;
}

export interface Responsable {
  nombre: string;
  responsabilidad: string;
}

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css'],
  providers: [
    NgbPopoverConfig,
    OperacionesForm1ServicioService,
    OperacionesForm1ValidadorService,
    OperacionesForm1LoaderService
  ]
})
export class Form1Component implements OnInit {
  loading = false;
  editMode = false;
  error: string;
  get form(): FormGroup {
    return this.operacionesForm1ServicioService.form;
  }

  get selectedIncidenteGroup(): AbstractControl {
    if (!this.operacionesForm1ServicioService.incidentesArray.length) return;

    return this.operacionesForm1ServicioService.incidentesArray.at(this.form.get('selectedIncidente').value);
  }

  constructor(
    config: NgbPopoverConfig,
    private operacionesForm1LoaderService: OperacionesForm1LoaderService,
    private operacionesForm1ServicioService: OperacionesForm1ServicioService,
    private alertService: AlertService
    ) { }
  
  ngOnInit() {
    if (this.editMode) {
      this.operacionesForm1LoaderService.loadIncidenteForEdit(DEMO_INCIDENTE);
    }
  }

  async submit(data: IIncidenteFormInterface) {
    // console.log('form1: ' + JSON.stringify(data));
    this.alertService.clear();

    if (!this.operacionesForm1ServicioService.isValid) {
      // console.log('Formulario no valido');
      this.alertService.error('Formulario no valido, por favor completar los campos obligatorios');
      return;
    }

    const evento: IIncidenteFormInterface = this.operacionesForm1ServicioService.createIncidenteEventoDto(data);
/*     if(Number(evento.incidentes[0].detalles.length)==0) {
      this.alertService.error('!!! Por favor indicar tipo de falla y descripcion del incidente');
    } else {
      alert(`Estimado ${evento.detalleeventoOperaciones.produccion.responsableProduccion}, evento creado`);
    } */
  }

  reset() {
    this.operacionesForm1ServicioService.resetForm();
  }

  onIncidenteAdd() {
    this.operacionesForm1ServicioService.addIncidente();
    this.operacionesForm1ServicioService.selectIncidenteForEdit(this.operacionesForm1ServicioService.incidentesArray.length - 1);
  }

  onIncidenteDelete(index: number) {
    this.operacionesForm1ServicioService.deleteIncidente(index);
  }

  onIncidenteSelected(index: number) {
    this.operacionesForm1ServicioService.selectIncidenteForEdit(index);
  }

}

