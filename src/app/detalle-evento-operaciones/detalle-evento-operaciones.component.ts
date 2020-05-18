import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractControl, FormArray } from '@angular/forms';

//EVALUAR PARA RESCATAR RESPPRODUCCION
import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';


/* export interface State {
  flag: string;
  name: string;
  population: string;
} */

export interface Responsable {
  flag: string;
  nombre: string;
  empresa: string;
}

interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-evento-operaciones',
  templateUrl: './detalle-evento-operaciones.component.html',
  styleUrls: ['./detalle-evento-operaciones.component.css'],
  providers: [NgbPopoverConfig]

})

export class DetalleEventoOperacionesComponent implements OnInit {

  @Input() selectedEventGroup: AbstractControl;
  @Input() group: FormGroup;

  // GRAB USR AUTH RESPPROD
  public mycurrentUser: User;

  // @Output() addPizza = new EventEmitter();

  /* get toppingsArray(): FormArray {
    if (!this.selectedEventGroup) return;

    return this.selectedEventGroup.get('toppings') as FormArray;
  } */

  // stateCtrl = new FormControl();
  responsableCtrl = new FormControl();
  // mostrarResponsable = new FormControl();
  // filteredStates: Observable<State[]>;
  filteredResponsables: Observable<Responsable[]>;
  // responsable: Responsable;
  // states: State[] = [

    areas: Area[] = [
      {value: 'PRENSA', viewValue: 'PRENSA'},
      {value: 'BIENVENIDOS', viewValue: 'BIENVENIDOS'},
      {value: 'ENTRETENCION', viewValue: 'ENTRETENCION'},
      {value: 'DOCU_REALIDAD', viewValue: 'DOCU REALIDAD'},
      {value: 'FICCION', viewValue: 'FICCION'},
      {value: 'CULTURA_REPORTAJES', viewValue: 'CULTURA Y REPORTAJES'},
      {value: 'DEPORTES', viewValue: 'DEPORTES'},
      {value: 'COMERCIAL', viewValue: 'COMERCIAL'},
      {value: 'SENALES', viewValue: 'SENALES'},
      {value: 'MEDIOS_DIGITALES', viewValue: 'MEDIOS DIGITALES'},
      {value: 'INGENIERIA', viewValue: 'INGENIERIA'}
    ];

  responsables: Responsable[] = [
    {
      nombre: 'Responsable 1',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      nombre: 'Responsable 2',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      nombre: 'Responsable 3',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      nombre: 'Responsable 4',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  // AUTH PARA GRAB RESPPROD
  constructor(config: NgbPopoverConfig,
    private authenticationService: AuthenticationService)
     {
    this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
/*     this.group.controls['produccion'].setValue({
      areaProduccion: this.currentUser
    }); */
    // customize default values of popovers used by this component tree
    config.placement = 'top-left';
    config.triggers = 'hover';

    // this.responsableCtrl.disabled;
    // this.mostrarResponsable.disabled;
    this.filteredResponsables = this.responsableCtrl.valueChanges
    .pipe(
      startWith(''),
      map(responsable => responsable ? this._filterResponsables(responsable) : this.responsables.slice())
    );

  }
  // "top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right", "left", "left-top", "left-bottom","right", "right-top", "right-bottom"
  ngOnInit() {
  }

  private _filterResponsables(value: string): Responsable[] {
    const filterValue = value.toLowerCase();

    return this.responsables.filter(responsable => responsable.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

}
