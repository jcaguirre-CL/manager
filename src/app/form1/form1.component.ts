import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
// ****
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1LoaderService } from '../servicios/operaciones-form1-loader.service';
// ******

// import { DEMO_PIZZA } from './services/demo-pizza-item';
import { DEMO_INCIDENTE } from '../servicios/demo-incidente-item';
// import { IPizzaFormInterface } from './services/pizza-form.interface';
/* 
import { PizzaFormValidatorsService } from './services/pizza-form-validators.service';
import { PizzaFormService } from './services/pizza-form.service';
import { PizzaLoaderService } from './services/pizza-loader.service';
 */

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

/*   @Input() selectedEventGroup: AbstractControl;
  @Output() addPizza = new EventEmitter(); */

/*   get toppingsArray(): FormArray {
    if (!this.selectedEventGroup) return;

    return this.selectedEventGroup.get('toppings') as FormArray;
  } */

  stateCtrl = new FormControl();
  mostrarResponsable = new FormControl();
  filteredStates: Observable<State[]>;
  responsable: Responsable;
  states: State[] = [
    {
      name: 'Responsable 1',
      population: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Responsable 2',
      population: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Responsable 3',
      population: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Responsable 4',
      population: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

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
    ) {
    // customize default values of popovers used by this component tree
    config.placement = 'top-left';
    config.triggers = 'hover';
    this.responsable = 
      {
        nombre: 'Nombre',
        responsabilidad: 'Canal 13'
    }
    this.mostrarResponsable.disabled;
    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );

  }
  // "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "left-top", "left-bottom","right", "right-top", "right-bottom"
  ngOnInit() {
  }

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
