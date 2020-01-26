import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractControl, FormArray } from '@angular/forms';

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
  providers: [NgbPopoverConfig]
})
export class Form1Component implements OnInit {

  @Input() selectedEventGroup: AbstractControl;
  @Output() addPizza = new EventEmitter();

  get toppingsArray(): FormArray {
    if (!this.selectedEventGroup) return;

    return this.selectedEventGroup.get('toppings') as FormArray;
  }

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


  constructor(config: NgbPopoverConfig) {
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
