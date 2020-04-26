import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';
import { IIncidenteFormInterface, IDetalleItem, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';

@Injectable()
export class OperacionesForm1ServicioService {
  public availableDetalles = [...Object.values(IncidenteDetallesEnum)];
  public form: FormGroup;
  public mycurrentUser: User;

  constructor(
    private operacionesForm1ValidadorService: OperacionesForm1ValidadorService,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
    this.form = this.fb.group({
      selectedIncidente: null,
      incidentes: this.fb.array([]),
      detalleeventoOperaciones: this.fb.group({
        fechaEvento: [null, Validators.required],
        responsableEvento: [null, Validators.required],
        atencionEvento: [null, Validators.required],
        obsEvento: [null, Validators.required],
        produccion: this.fb.group({
          areaProduccion: [null, Validators.required],
          responsableProduccion: [null, Validators.required],
          pgmProduccion: [null, Validators.required],
        })
      })
    }, {
      validator: this.operacionesForm1ValidadorService.formValidator()
    });
  }

  get incidentesArray(): FormArray {
    return this.form.get('incidentes') as FormArray;
  }

  get isValid(): boolean {
    console.log(this.form);
    this.form.setValue({
      selectedIncidente: this.form.value.selectedIncidente,
      incidentes: this.form.value.incidentes,
      // detalleeventoOperaciones: this.form.value.detalleeventoOperaciones,
      detalleeventoOperaciones: {
        fechaEvento: this.form.value.detalleeventoOperaciones.fechaEvento,
        responsableEvento: this.form.value.detalleeventoOperaciones.responsableEvento,
        atencionEvento: this.form.value.detalleeventoOperaciones.atencionEvento,
        obsEvento: this.form.value.detalleeventoOperaciones.obsEvento,
        produccion: { 
          areaProduccion: this.form.value.detalleeventoOperaciones.produccion.areaProduccion,
          responsableProduccion: this.mycurrentUser.nombre + ' ' + this.mycurrentUser.apellido,
          pgmProduccion: this.form.value.detalleeventoOperaciones.produccion.pgmProduccion
        }
      } 
      // responsableProduccion: 'test'
      /* produccion:{
        responsableProduccion: 'test nombre' */
    });
    if (!this.form.valid) {
      this.operacionesForm1ValidadorService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  selectIncidenteForEdit(index: number) {
    this.form.get('selectedIncidente').setValue(index);
  }

  addIncidente(): FormGroup {
    const incidenteGroup = this.getIncidenteFormGroup();
    this.incidentesArray.push(this.getIncidenteFormGroup());

    this.form.markAsDirty();

    return incidenteGroup;
  }

  deleteIncidente(index: number): void {
    this.incidentesArray.removeAt(index);
    this.form.markAsDirty();
  }

  getIncidenteFormGroup(motivo: string = '', descripcion: string = '', impacto: string = '', area: IncidenteAreaEnum = IncidenteAreaEnum.NIVEL1): FormGroup {
    return this.fb.group({
      area: [area],
      motivo: [motivo],
      descripcion: [descripcion],
      impacto: [impacto],
      detalles: this.mapToCheckboxArrayGroup(this.availableDetalles)
    }, {
      validator: this.operacionesForm1ValidadorService.incidenteItemValidator()
    });
  }

  /**
   * Creates a pizza DTO Object using the server pizza interface
   * In this example it is the same except the toppings array,
   * so for simplicity i used the same interface,
   * usually the return object will be of different type
   */
  createIncidenteEventoDto(data: IIncidenteFormInterface): IIncidenteFormInterface {
    // const order = {
    const evento = {
      detalleeventoOperaciones: data.detalleeventoOperaciones,
      incidentes: data.incidentes
    };

    for (const incidente of evento.incidentes) {
      incidente.detalles = this.getSelectedDetalles(incidente.detalles as IDetalleItem[])
        .map((i) => {
          return i.name;
        });
    }

    return evento;
  }

  getSelectedDetalles(detalles: IDetalleItem[]): IDetalleItem[] {
    return detalles.filter(i => i.selected);
  }

  resetForm() {
    while (this.incidentesArray.length) {
      this.incidentesArray.removeAt(0);
    }

    this.form.reset();
  }

  /**
   * Create a mapping of a string based dataset
   * to a form array suitable for a multi checkbox array selection.
   * this provides a more concise solution
   * as oppose to working with [true, false, false, true]
   */
  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
  }
}
