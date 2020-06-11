// RESUMEN ESTRUCURA DE DATO:= IIncidenteFormInterface
export interface IIncidenteFormInterface {
    selectedIncidente?: IIncidenteItem;
    incidentes: IIncidenteItem[];
    detalleeventoOperaciones: IDetalleEventoOperaciones;
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
    responsableEvento: string;  
    atencionEvento: string;
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
    graficaRecurso: string;
    graficaPersonal: string;
    audioRecurso: string;
    audioPersonal: string;
    iluminacionRecurso: string;
    iluminacionPersonal: string;
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
    TIPOFALLA1 = 'Audio',
    TIPOFALLA2 = 'Cámara',
    TIPOFALLA3 = 'Iluminación',
    TIPOFALLA4 = 'Ingesta',
    TIPOFALLA5 = 'Edición',
    TIPOFALLA6 = 'Supervisión',
    TIPOFALLA7 = 'Utilería'
  }
  