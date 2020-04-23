export interface IIncidenteFormInterface {
    selectedIncidente?: IIncidenteItem;
    incidentes: IIncidenteItem[];
    // pizzas: IIncidenteItem[];
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
    descripcionEvento: string;
    areaEvento: string;
    produccion: {
      nombreProduccion: string;
      encargadoCanal: string;
    };
  }
  
  // RESPALDO
  /* export interface IDetalleEventoOperaciones {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    fechaEvento: string;
    responsableEvento: string;  
    atencionEvento: string;
    descripcionEvento: string;
    areaEvento: string;
    address: {
      street: string;
      houseNum: string;
      city: string;
      floor: number;
    };
    produccion: {
      nombreProduccion: string;
      encargadoCanal: string;
    };
    evento: {
      atencionEvento: string;
      descripcionEvento: string;
      areaEvento: string;
    };
  } */

  export enum IncidenteAreaEnum {
    AREA1 = 1,
    AREA2 = 2,
    AREA3 = 3
  }
  
  export enum IncidenteDetallesEnum {
    OPCION1 = 'Opcion1',
    OPCION2 = 'Opcion2',
    OPCION3 = 'Opcion3',
    OPCION4 = 'Opcion4'
    // SAUSAGE = 'Sausage',
    // PEPPERONI = 'Pepperoni',
    // HAM = 'Ham',
    // OLIVES = 'Olives',
    // BACON = 'Bacon',
    // CORN = 'Corn',
    // PINEAPPLE = 'Pineapple',
    // MUSHROOMS = 'Mushrooms'
  }
  