import { TestBed } from '@angular/core/testing';

import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';

describe('OperacionesForm1ValidadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1ValidadorService = TestBed.get(OperacionesForm1ValidadorService);
    expect(service).toBeTruthy();
  });
});
