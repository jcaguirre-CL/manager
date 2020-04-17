import { IIncidenteFormInterface, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

export const DEMO_INCIDENTE: IIncidenteFormInterface = {
  detalleeventoOperaciones: {
    address: {
      floor: 1,
      street: 'Test street',
      houseNum: '44',
      city: 'New York'
    },
    lastName: 'Lover',
    firstName: 'Pizza',
    phoneNumber: '100100100',
  },
  incidentes: [{
    detalles: [IncidenteDetallesEnum.OPCION1, IncidenteDetallesEnum.OPCION2] as any,
    area: IncidenteAreaEnum.AREA1
  }]
};
