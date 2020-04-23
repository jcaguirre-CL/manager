import { IIncidenteFormInterface, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

export const DEMO_INCIDENTE: IIncidenteFormInterface = {
  detalleeventoOperaciones: {
    produccion: {
      nombreProduccion: 'Test street',
      encargadoCanal: 'New York'
    },
    fechaEvento: '10/10/2000',
    responsableEvento: 'Responsable 1',
    atencionEvento: 'Canal 13',
    descripcionEvento: 'XX',
    areaEvento: 'AREA 1'
  },
  incidentes: [{
    detalles: [IncidenteDetallesEnum.OPCION1, IncidenteDetallesEnum.OPCION2] as any,
    area: IncidenteAreaEnum.AREA1
  }]
};

