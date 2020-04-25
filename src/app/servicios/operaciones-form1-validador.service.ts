import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IDetalleItem, IncidenteAreaEnum } from './evento-operaciones.interface';

/* @Injectable({
  providedIn: 'root'
}) */
@Injectable()
export class OperacionesForm1ValidadorService {

  constructor() { }

  formValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};

      if (!(control.get('incidentes') as FormArray).length) {
        errors.noIncidentes = {
          message: 'Evento no seleccionado'
        };
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  incidenteItemValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const errors: ValidationErrors = {};

      const incidenteArea: IncidenteAreaEnum = control.get('area').value;
      const incidenteDetalles: IDetalleItem[] = control.get('detalles').value.filter(i => i.selected);

      if (incidenteArea !== IncidenteAreaEnum.NIVEL1 && incidenteDetalles.length > 4) {
        errors.detalleIncidenteArea = {
          message: 'ERROR NIVEL en el ingreso'
        };
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
