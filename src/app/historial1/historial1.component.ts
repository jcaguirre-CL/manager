import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DataSource } from '@angular/cdk/collections';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';

import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Nombre 1', weight: 'Responsable 1', symbol: 'SI', status: 'CERRADO'},
  {position: 2, name: 'Nombre 2', weight: 'Responsable 1', symbol: 'NO', status: 'CERRADO'},
  {position: 3, name: 'Nombre 3', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 4, name: 'Nombre 4', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 5, name: 'Nombre 5', weight: 'Responsable 1', symbol: 'SI', status: 'CERRADO'},
  {position: 6, name: 'Nombre 6', weight: 'Responsable 1', symbol: 'NO', status: 'CERRADO'},
  {position: 7, name: 'Nombre 7', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 8, name: 'Nombre 8', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 9, name: 'Nombre 9', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
  {position: 10, name: 'Nombre 10', weight: 'Responsable 1', symbol: 'NO', status: 'PDTE'},
];

@Component({
  selector: 'app-historial1',
  templateUrl: './historial1.component.html',
  styleUrls: ['./historial1.component.css'],
  providers: [
    OperacionesForm1ServicioService,
    OperacionesForm1ValidadorService
  ]
})
export class Historial1Component implements OnInit {
  displayedColumns: string[] = ['fecha', 'produccion', 'programa', 'responsable', 'aprobado', 'estado'];
  // dataSource = ELEMENT_DATA;
  isLoading = false;
  // private operacionesForm1ServicioService: OperacionesForm1ServicioService
  // dataSource : IIncidenteFormInterface[];
  // registrosAll: Observable<IIncidenteFormInterface[]>;

  dataSource = new RegistroDataSource(this.operacionesForm1ServicioService);
  private mycurrentUser: User;


  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(
    private authenticationService: AuthenticationService,
    private operacionesForm1ServicioService: OperacionesForm1ServicioService
    ) {
                this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);

               }

/*   getRegistrosAll() {
    this.isLoading = true; */
/*     this.registrosAll = this.operacionesForm1ServicioService.getRegistros()
                        .pipe(finalize(() => this.isLoading = false)); */
    // this.dataSource.addData = this.incidencias;
    // console.log(this.registrosAll);
  // }
  ngOnInit() {
    // console.log('registro');
    // this.dataSource = this.getRegistros();

    // this.getRegistrosAll();


  }

  // getRegistros(): IIncidenteFormInterface[] {
  //   console.log('getRegistros: ' + JSON.stringify(this.mycurrentUser));
  //   return this.operacionesForm1ServicioService.getRegistrosInternos(this.mycurrentUser)
  //   .subscribe(data => {
  //     console.log('recuperando: ' + JSON.stringify(data));
  //   });

  // }

}

export class RegistroDataSource extends DataSource<any> {

  constructor(private operacionesForm1ServicioService: OperacionesForm1ServicioService
    
    ) {
    super();
  }
  connect(): Observable<IIncidenteFormInterface[]> {
      console.log('registro')
    return this.operacionesForm1ServicioService.getRegistrosInternos();
  }
  disconnect() { }
}







