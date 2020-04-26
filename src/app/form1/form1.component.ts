import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1LoaderService } from '../servicios/operaciones-form1-loader.service';
import { DEMO_INCIDENTE } from '../servicios/demo-incidente-item';

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

  editMode = false;
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
    private operacionesForm1ServicioService: OperacionesForm1ServicioService
    ) { }
  
  ngOnInit() {
    if (this.editMode) {
      this.operacionesForm1LoaderService.loadIncidenteForEdit(DEMO_INCIDENTE);
    }
  }

  async submit(data: IIncidenteFormInterface) {
    console.log('form1: ' + JSON.stringify(data));

    if (!this.operacionesForm1ServicioService.isValid) {
      console.log('Formulario no valido')
      return;
    }

    const evento: IIncidenteFormInterface = this.operacionesForm1ServicioService.createIncidenteEventoDto(data);

    alert(`Thanks ${evento.detalleeventoOperaciones.responsableEvento}, evento creado`);

    if (this.editMode) {
      // update api endpoint call
    } else {
      // create api endpoint call
    }
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

    // customize default values of popovers used by this component tree
/*     config.placement = 'top-left';
    config.triggers = 'hover';
 *//*     this.responsable = 
      {
        nombre: 'Nombre',
        responsabilidad: 'Canal 13'
    }
    this.mostrarResponsable.disabled; */
/*     this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    ); */


  // "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "left-top", "left-bottom","right", "right-top", "right-bottom"


/*   private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  } */

