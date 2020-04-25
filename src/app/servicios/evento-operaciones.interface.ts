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
    area: IncidenteAreaEnum;
    /**
     * A small hack for imitating a different model returned from server,
     * for the simplicity sake the same interface was used.
     * In real life the server model may vary from the form model.
     * In this case you need to maintain both the server model interface and the client form interface.
     */
    detalles: IDetalleItem[] | IncidenteDetallesEnum[];
    // detalles: IToppingItem[] | PizzaToppingsEnum[];
  }
  
  // Estructura de datos: EVENTO
  export interface IDetalleEventoOperaciones {
    fechaEvento: string;
    responsableEvento: string;  
    atencionEvento: string;
    obsEvento: string;
    areaEvento: string;
    produccion: {
      nombreProduccion: string;
      encargadoCanal: string;
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
  