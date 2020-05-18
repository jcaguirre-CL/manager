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
  isLoading = false;

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
  ngOnInit() { }
}

export class RegistroDataSource extends DataSource<any> {
  constructor(private operacionesForm1ServicioService: OperacionesForm1ServicioService
    ) {
    super();
  }
  connect(): Observable<IIncidenteFormInterface[]> {
    return this.operacionesForm1ServicioService.getRegistrosInternos();
  }
  disconnect() { }
}







