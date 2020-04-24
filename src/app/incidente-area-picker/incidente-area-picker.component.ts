import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IncidenteAreaEnum } from '../servicios/evento-operaciones.interface';
// import { PizzaSizeEnum } from '../../containers/pizza-form-container/services/pizza-form.interface';

@Component({
  selector: 'app-incidente-area-picker',
  templateUrl: './incidente-area-picker.component.html',
  styleUrls: ['./incidente-area-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IncidenteAreaPickerComponent),
      multi: true
    }
  ]
})
export class IncidenteAreaPickerComponent implements ControlValueAccessor {
incidenteArea: IncidenteAreaEnum;
IncidenteAreaEnum = IncidenteAreaEnum;
  constructor() { }

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

/*   ngOnInit() {
  } */

}
