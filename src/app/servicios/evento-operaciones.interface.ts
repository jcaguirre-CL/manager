// RESUMEN ESTRUCURA DE DATO:= IIncidenteFormInterface
export interface IIncidenteFormInterface {
    selectedIncidente?: IIncidenteItem;
    incidentes: IIncidenteItem[];
    detalleeventoOperaciones: IDetalleEventoOperaciones;
    id: string;
    // customerDetails: ICustomerDetails;
  }
  
  export interface IDetalleItem {
  // export interface IToppingItem {
    name: IncidenteDetallesEnum;
    // name: PizzaToppingsEnum;
    selected: boolean;
  }
  
  // export interface IPizzaItem {
  export interface IIncidenteItem {
    // NIVEL INCIDENCIA:= AREA
    area: IncidenteAreaEnum;
    // TIPO INCIDENCIA:= DETALLES
    detalles: IDetalleItem[] | IncidenteDetallesEnum[];
    // detalles: IToppingItem[] | PizzaToppingsEnum[];
    //DESCRIPCION C13
    descripcion: string;
    //OBS EXTERNA
    observacion: string;
    impacto: string; 
    motivo: string;
  }
  
  // Estructura de datos: EVENTO
  export interface IDetalleEventoOperaciones {
    tipoOperacion: string;
    tipoLocacion: string;
    fechaEvento: string;
    horaProgIni: string;
    horaProgFin: string;
    horaRealIni: string;
    horaRealFin: string;
    atrasoIni: string;
    atrasoFin: string;
    responsableEvento: string;  
    atencionEvento: string;
    switchEvento: string;
    locacionEvento: string;
    obsEvento: string;
    camaraCamara: string;
    camaraPluma: string;
    camaraSteady: string;
    camaraRiel: string;
    camaraDron: string;
    camaraPersonal: string;
    videoComunicaciones: string;
    videoPantallas: string;
    videoSwitch: string;
    videoPersonal: string;
    playRecurso: string;
    playContenido: string;
    playPersonal: string;
    graficaRecurso: string;
    graficaContenido: string;
    graficaPersonal: string;
    audioRecurso: string;
    audioPersonal: string;
    iluminacionRecurso: string;
    iluminacionPersonal: string;
    transporteEnlaceServicio: string;
    energiaServicio: string;
    acServicio: string;
    maquillajeServicio: string;
    utileriaServicio: string;
    tramoyaServicio: string;
    supervisorServicio: string;
    confirmaProd: string;
    obsEventoProduccion: string;
    obsEventoGestion: string;
    nivelIncidencia: string,
    nivelImpacto: string,
    estadoEvento: string,
    errorArea: string;
    produccion: {
      areaProduccion: string;
      pgmProduccion: string;
      tipopgmProduccion: string;
      responsableProduccion: string;
    };
  }
  
  export enum IncidenteAreaEnum {
    NIVEL1 = 1,
    NIVEL2 = 2,
    NIVEL3 = 3
  }
  
  export enum IncidenteDetallesEnum {
    TIPOFALLA1 = 'CAMARA',
    TIPOFALLA2 = 'VIDEO',
    TIPOFALLA3 = 'PLAY OUT',
    TIPOFALLA4 = 'GRAFICA',
    TIPOFALLA5 = 'AUDIO',
    TIPOFALLA6 = 'ILUMINACION',
    TIPOFALLA7 = 'TRANSPORTE SEÑAL/ENLACE',
    TIPOFALLA8 = 'ENERGIA',
    TIPOFALLA9 = 'AC',
    TIPOFALLA10 = 'MAQUILLAJE/PELUQUERIA',
    TIPOFALLA11 = 'UTILERIA',
    TIPOFALLA12 = 'TRAMOYA',
    TIPOFALLA13 = 'SUPERVISOR'

  }
  