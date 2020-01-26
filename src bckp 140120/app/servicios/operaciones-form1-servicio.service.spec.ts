import { TestBed } from '@angular/core/testing';

import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';

describe('OperacionesForm1ServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1ServicioService = TestBed.get(OperacionesForm1ServicioService);
    expect(service).toBeTruthy();
  });
});
