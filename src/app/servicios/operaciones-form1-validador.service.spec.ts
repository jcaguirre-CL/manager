/* import { TestBed } from '@angular/core/testing';

import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';

describe('OperacionesForm1ValidadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1ValidadorService = TestBed.get(OperacionesForm1ValidadorService);
    expect(service).toBeTruthy();
  });
});
 */

import { TestBed, inject } from '@angular/core/testing';
import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';
import { AppModule } from '../app.module';

import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';

describe('OperacionesForm1ValidadorService', () => {
  let validatorService: OperacionesForm1ValidadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [OperacionesForm1ValidadorService]
    });
  });

  beforeEach(inject([OperacionesForm1ValidadorService], (service: OperacionesForm1ValidadorService) => {
    validatorService = service;
  }));

  describe('Form Validator', () => {
    let formValidator: ValidatorFn;
    beforeEach(() => {
      formValidator = validatorService.formValidator();
    });

    it('should return error when there is no incidente', () => {
      const result = formValidator(new FormGroup({
        incidentes: new FormArray([])
      }));

      expect(result.noIncidentes).toBeTruthy();
    });

    it('should not return error when incidentes exist', () => {
      const result = formValidator(new FormGroup({
        incidentes: new FormArray([
          new FormGroup({})
        ])
      }));

      expect(result).toBe(null);
    });
  });
});
