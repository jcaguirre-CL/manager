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
    obsEvento: 'XX',
    areaEvento: 'BIENVENIDOS'
  },
  incidentes: [{
    detalles: [IncidenteDetallesEnum.TIPOFALLA1, IncidenteDetallesEnum.TIPOFALLA2] as any,
    area: IncidenteAreaEnum.NIVEL1
  }]
};

