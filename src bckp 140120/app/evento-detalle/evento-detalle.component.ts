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
  selector: 'app-evento-detalle',
  templateUrl: './evento-detalle.component.html',
  styleUrls: ['./evento-detalle.component.css']
})
export class EventoDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
