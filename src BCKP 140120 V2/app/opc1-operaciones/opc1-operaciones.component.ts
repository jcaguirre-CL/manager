import { Component, OnInit, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PizzaSizeEnum } from '../servicios/evento-operaciones.interface';

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
  pizzaSize: PizzaSizeEnum;
  PizzaSizeEnum = PizzaSizeEnum;
  constructor() { }

  ngOnInit() {
  }

  changeSize(size: PizzaSizeEnum) {
    this.pizzaSize = size;
    this.propagateChange(size);
  }

  propagateChange = (value: PizzaSizeEnum) => {};
  writeValue(value: PizzaSizeEnum) {
    this.pizzaSize = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
