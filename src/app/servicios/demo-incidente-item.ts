import { IIncidenteFormInterface, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

export const DEMO_INCIDENTE: IIncidenteFormInterface = {
  detalleeventoOperaciones: {
    produccion: {
      areaProduccion: 'AREA PROD',
      pgmProduccion: 'PGM PROD',
      responsableProduccion: 'RESP PROD'
    },
    fechaEvento: '10/10/2000',
    responsableEvento: 'Responsable 1',
    atencionEvento: 'Canal 13',
    obsEvento: 'NO OBS'
  },
  incidentes: [{
    detalles: [IncidenteDetallesEnum.TIPOFALLA1, IncidenteDetallesEnum.TIPOFALLA2] as any,
    area: IncidenteAreaEnum.NIVEL1,
    descripcion: '',
    observacion:'',
    impacto:'',
    motivo:''
  }]
};

