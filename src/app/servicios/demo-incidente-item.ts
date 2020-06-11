import { IIncidenteFormInterface, IncidenteAreaEnum, IncidenteDetallesEnum } from './evento-operaciones.interface';

export const DEMO_INCIDENTE: IIncidenteFormInterface = {
  detalleeventoOperaciones: {
    produccion: {
      areaProduccion: 'AREA PROD',
      pgmProduccion: 'PGM PROD',
      tipopgmProduccion: 'TIPO PGM PROD',
      responsableProduccion: 'RESP PROD'
    },
    tipoOperacion: 'TEST',
    tipoLocacion: 'TEST',
    fechaEvento: '10/10/2000',
    responsableEvento: 'Responsable 1',
    atencionEvento: 'Canal 13',
    obsEvento: 'NO OBS',
    camaraCamara: 'SI',
    camaraPluma: 'SI',
    camaraSteady: 'SI',
    camaraRiel: 'SI',
    camaraDron: 'SI',
    camaraPersonal: 'SI',
    videoComunicaciones: 'SI',
    videoPantallas: 'SI',
    videoSwitch: 'SI',
    videoPersonal: 'SI',
    graficaRecurso: 'SI',
    graficaPersonal: 'SI',
    audioRecurso: 'SI',
    audioPersonal: 'SI',
    iluminacionRecurso: 'SI',
    iluminacionPersonal: 'SI'
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

