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
    switchEvento: 'TEST',
    locacionEvento: 'TEST',
    fechaEvento: '10/10/2000',
    horaProgIni: '',
    horaProgFin: '',
    horaRealIni: '',
    horaRealFin: '',
    atrasoIni: '',
    atrasoFin: '',
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
    playRecurso: 'SI',
    playContenido: 'SI',
    playPersonal: 'SI',
    graficaRecurso: 'SI',
    graficaContenido: 'SI',
    graficaPersonal: 'SI',
    audioRecurso: 'SI',
    audioPersonal: 'SI',
    iluminacionRecurso: 'SI',
    iluminacionPersonal: 'SI',
    transporteEnlaceServicio: 'SI',
    energiaServicio: 'SI',
    acServicio: 'SI',
    maquillajeServicio: 'SI',
    utileriaServicio: 'SI',
    tramoyaServicio: 'SI',
    supervisorServicio: 'SI',
    confirmaProd: 'SI'
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

