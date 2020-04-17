import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { IIncidenteItem, IDetalleItem, IncidenteAreaEnum } from '../servicios/evento-operaciones.interface';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';

@Component({
  selector: 'app-lista-incidentes-operaciones',
  templateUrl: './lista-incidentes-operaciones.component.html',
  styleUrls: ['./lista-incidentes-operaciones.component.css']
})
export class ListaIncidentesOperacionesComponent implements OnInit {
  @Input() group: FormGroup;

  @Output() deleteIncidente = new EventEmitter<number>();
  @Output() addIncidente = new EventEmitter();
  @Output() incidenteSelected = new EventEmitter<number>();

  get incidentesArray(): FormArray {
    return this.group.get('incidentes') as FormArray;
  }

  constructor(
    private operacionesForm1ServicioService : OperacionesForm1ServicioService
  ) { }

  ngOnInit() {
  }

  getIncidenteListItemClassStates(incidente: AbstractControl, index: number) {
    return {
      'IncidenteList__item--active': this.group.get('selectedIncidente').value === index,
      'IncidenteList__item--has-error': !incidente.valid && incidente.dirty
    };
  }

  getIncidenteTitle(incidente: IIncidenteItem): string {
    const selectedDetalles = this.operacionesForm1ServicioService
      .getSelectedDetalles((incidente.detalles as IDetalleItem[]))
      .map(i => i.name);

    const detallesString = this.getDetallesString(selectedDetalles);
    const areaString = this.getIncidenteAreaTitle(incidente.area);

    return `Tipo Incidencia: ${areaString}  ${detallesString}`;
  }

  private getDetallesString(detalles: string[]): string {
    if (!detalles || !detalles.length) return '';

    return `- ${detalles.toString()}`;
  }

  private getIncidenteAreaTitle(area: IncidenteAreaEnum): string {
    let incidenteArea;
    switch (area) {
      case IncidenteAreaEnum.AREA1:
        incidenteArea = 'AREA 1';
        break;
      case IncidenteAreaEnum.AREA2:
        incidenteArea = 'AREA 2';
        break;
      case IncidenteAreaEnum.AREA3:
        incidenteArea = 'AREA 3';
        break;
    }

    return incidenteArea;
  }

}

