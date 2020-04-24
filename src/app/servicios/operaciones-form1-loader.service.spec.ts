/* import { TestBed } from '@angular/core/testing';

import { OperacionesForm1LoaderService } from './operaciones-form1-loader.service';

describe('OperacionesForm1LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1LoaderService = TestBed.get(OperacionesForm1LoaderService);
    expect(service).toBeTruthy();
  });
}); */

import { inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';
import { IncidenteDetallesEnum } from './evento-operaciones.interface';
import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';

import { OperacionesForm1LoaderService } from './operaciones-form1-loader.service';

describe('IncidenteLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [OperacionesForm1LoaderService, OperacionesForm1ServicioService, OperacionesForm1ValidadorService]
    });
  });

  it('should change selected state of selected items', inject([OperacionesForm1LoaderService], (service: OperacionesForm1LoaderService) => {
    const DETALLES_DATA = [{
      selected: false,
      name: IncidenteDetallesEnum.OPCION1
    }, {
      selected: false,
      name: IncidenteDetallesEnum.OPCION2
    }, {
      selected: false,
      name: IncidenteDetallesEnum.OPCION3
    }];

    const result = service.prefillDetallesSelection(DETALLES_DATA, [IncidenteDetallesEnum.OPCION1, IncidenteDetallesEnum.OPCION1]);
    expect(result[0].selected).toBe(false);
    expect(result[2].selected).toBe(true);
  }));
});
