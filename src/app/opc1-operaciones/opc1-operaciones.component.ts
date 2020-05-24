import { Component, OnInit, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IncidenteAreaEnum } from '../servicios/evento-operaciones.interface';

@Component({
  selector: 'app-opc1-operaciones',
  templateUrl: './opc1-operaciones.component.html',
  styleUrls: ['./opc1-operaciones.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Opc1OperacionesComponent),
      multi: true
    }
  ]
})
export class Opc1OperacionesComponent implements ControlValueAccessor {
  incidenteArea: IncidenteAreaEnum;
  IncidenteAreaEnum = IncidenteAreaEnum;
  constructor() { }

  ngOnInit() {
  }

  changeArea(area: IncidenteAreaEnum) {
    this.incidenteArea = area;
    this.propagateChange(area);
  }

  propagateChange = (value: IncidenteAreaEnum) => {};
  writeValue(value: IncidenteAreaEnum) {
    this.incidenteArea = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
