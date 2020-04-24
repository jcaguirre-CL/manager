/* import { TestBed } from '@angular/core/testing';

import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';

describe('OperacionesForm1ServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1ServicioService = TestBed.get(OperacionesForm1ServicioService);
    expect(service).toBeTruthy();
  });
});
 */

import { inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';
import { IIncidenteFormInterface, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';
import { OperacionesForm1LoaderService } from './operaciones-form1-loader.service';

describe('OperacionesForm1ServicioService', () => {
  let operacionesForm1ServicioService: OperacionesForm1ServicioService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      providers: [OperacionesForm1ServicioService, OperacionesForm1LoaderService, OperacionesForm1ValidadorService]
    });
  });

  beforeEach(inject([OperacionesForm1ServicioService], (service: OperacionesForm1ServicioService) => {
    operacionesForm1ServicioService = service;
  }));

  describe('Service initialization', () => {
    it('should initialize a form group when class gets constructed', function () {
      expect(operacionesForm1ServicioService.form instanceof FormGroup).toEqual(true);
    });

    it('should initialize form properly', () => {
      expect(operacionesForm1ServicioService.form.get('incidentes').value.length).toBe(0);
      expect(operacionesForm1ServicioService.form.get('selectedIncidente').value).toBeNull();
      expect(operacionesForm1ServicioService.form.valid).toEqual(false);
    });
  });

  describe('Service behaviour', () => {
    it('should calculate if the form is valid', () => {
      operacionesForm1ServicioService.form = new FormGroup({
        name: new FormControl('', Validators.required)
      });
      expect(operacionesForm1ServicioService.isValid).toBe(false);
      operacionesForm1ServicioService.form.get('name').setValue('test');

      expect(operacionesForm1ServicioService.isValid).toBe(true);
    });

    it('should add incidente for the incidentes array', function () {
      expect(operacionesForm1ServicioService.form.get('incidentes').value.length).toEqual(0);
      operacionesForm1ServicioService.addIncidente();
      expect(operacionesForm1ServicioService.form.get('incidentes').value.length).toEqual(1);
    });

    it('should mark the form as dirty after incidente added', function () {
      expect(operacionesForm1ServicioService.form.dirty).toEqual(false);
      operacionesForm1ServicioService.addIncidente();
      expect(operacionesForm1ServicioService.form.dirty).toEqual(true);
    });

    it('should select a incidente for edit mode', () => {
      operacionesForm1ServicioService.addIncidente();
      operacionesForm1ServicioService.addIncidente();

      operacionesForm1ServicioService.selectIncidenteForEdit(0);
      expect(operacionesForm1ServicioService.form.get('selectedIncidente').value).toEqual(0);
    });

    it('should delete an added incidente', function () {
      operacionesForm1ServicioService.addIncidente();
      expect(operacionesForm1ServicioService.form.get('incidentes').value.length).toEqual(1);
      operacionesForm1ServicioService.deleteIncidente(0);
      expect(operacionesForm1ServicioService.form.get('incidentes').value.length).toEqual(0);
    });

    describe('Incidente Dto construction', () => {
      let demoData: IIncidenteFormInterface;
      beforeEach(() => {
        demoData = {
          incidentes: [{
            detalles: [{
              selected: false,
              name: IncidenteDetallesEnum.OPCION1
            }, {
              selected: true,
              name: IncidenteDetallesEnum.OPCION2
            }, {
              selected: true,
              name: IncidenteDetallesEnum.OPCION3
            }],
            area: IncidenteAreaEnum.AREA1
          }],
          detalleeventoOperaciones: {
            responsableEvento: 'Responsable 1'
          }
        } as any;
      });

      it('should create a incidente dto from a data object', function () {
        const constructedData = operacionesForm1ServicioService.createIncidenteEventoDto(demoData);
        expect(constructedData.incidentes.length).toEqual(1);
        expect(constructedData.detalleeventoOperaciones.responsableEvento).toEqual('Responsable 1');
      });

      it('should extract selected detalles only', function () {
        const constructedData = operacionesForm1ServicioService.createIncidenteEventoDto(demoData);
        expect(constructedData.incidentes[0].detalles.length).toEqual(2);
      });

      it('should convert detalle data structure to enum array', function () {
        const constructedData = operacionesForm1ServicioService.createIncidenteEventoDto(demoData);
        expect(constructedData.incidentes[0].detalles[0]).toEqual(IncidenteDetallesEnum.OPCION1);
      });
    });

    it('should return only selected detalles', function () {
      const selectedDetalles = operacionesForm1ServicioService.getSelectedDetalles([{
        name: IncidenteDetallesEnum.OPCION1,
        selected: false
      }, {
        name: IncidenteDetallesEnum.OPCION2,
        selected: true
      }, {
        name: IncidenteDetallesEnum.OPCION3,
        selected: false
      }]);

      expect(selectedDetalles.length).toEqual(1);
      expect(selectedDetalles[0].name).toEqual(IncidenteDetallesEnum.OPCION2);
    });
  });
});
