import { Injectable } from '@angular/core';
import { IIncidenteFormInterface, IDetalleItem, IncidenteDetallesEnum } from './evento-operaciones.interface';
import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesForm1LoaderService {

  constructor(
    private operacionesForm1ServicioService: OperacionesForm1ServicioService
  ) {

  }

  loadIncidenteForEdit(data: IIncidenteFormInterface): void {
    this.operacionesForm1ServicioService.form.patchValue({
      detalleeventoOperaciones: {
        ...data.detalleeventoOperaciones
      }
    });

    for (const incidente of data.incidentes) {
      const group = this.operacionesForm1ServicioService.addIncidente();
      group.patchValue({
        area: incidente.area,
        detalles: this.prefillDetallesSelection(group.get('detalles').value, incidente.detalles as IncidenteDetallesEnum[]),
        motivo: incidente.motivo,
        descripcion: incidente.descripcion,
        impacto: incidente.impacto
      });
    }
  }

  prefillDetallesSelection(detalles: IDetalleItem[], selectedDetalles: IncidenteDetallesEnum[]): IDetalleItem[] {
    return detalles.map((i) => {
      if (selectedDetalles.includes(i.name)) {
        i.selected = true;
      }

      return i;
    });
  }
}
