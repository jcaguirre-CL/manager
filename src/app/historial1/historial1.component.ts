import { Component, OnInit, Inject } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DataSource } from '@angular/cdk/collections';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';

import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';

import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'incidencia-dialog',
  templateUrl: 'incidencia.dialog.component.html',
  styleUrls: ['./incidencia.dialog.component.css']
})
export class IncidenciaDialogComponent implements OnInit {
  incidenciaDialogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    
    // private operacionesForm1ServicioService: OperacionesForm1ServicioService,
    public dialogRef: MatDialogRef<IncidenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIncidenteFormInterface) {
      // console.log(data.incidentes[0].descripcion);
    }
    onNoClick(): void {
      this.incidenciaDialogForm.reset();
      this.dialogRef.close();
    }
    ngOnInit() {
    this.incidenciaDialogForm = this.fb.group({
      selectedIncidente: null,
      // incidentes: this.fb.array([]),
      incidentes: this.data.incidentes,
      detalleeventoOperaciones: this.fb.group({
        fechaEvento: [this.data.detalleeventoOperaciones.fechaEvento,],
        horaProgIni: [this.data.detalleeventoOperaciones.horaProgIni,],
        horaProgFin: [this.data.detalleeventoOperaciones.horaProgFin,],
        horaRealIni: [this.data.detalleeventoOperaciones.horaRealIni,],
        horaRealFin: [this.data.detalleeventoOperaciones.horaRealFin,],
        atrasoIni: [this.data.detalleeventoOperaciones.atrasoIni,],
        atrasoFin: [this.data.detalleeventoOperaciones.atrasoFin,],
        responsableEvento: [this.data.detalleeventoOperaciones.responsableEvento,],
        atencionEvento: [this.data.detalleeventoOperaciones.atencionEvento,],
        switchEvento: [this.data.detalleeventoOperaciones.switchEvento,],
        locacionEvento: [this.data.detalleeventoOperaciones.locacionEvento,],
        tipoOperacion: [this.data.detalleeventoOperaciones.tipoOperacion,],
        tipoLocacion: [this.data.detalleeventoOperaciones.tipoLocacion,],
        obsEvento: [null,],
        camaraCamara: [null,],
        camaraPluma: [null,],
        camaraSteady: [null,],
        camaraRiel: [null,],
        camaraDron: [null,],
        camaraPersonal: [null,],
        videoComunicaciones: [null,],
        videoPantallas: [null,],
        videoSwitch: [null,],
        videoPersonal: [null,],
        playRecurso: [null,],
        playContenido: [null,],
        playPersonal: [null,],
        graficaRecurso: [null,],
        graficaContenido: [null,],
        graficaPersonal: [null,],
        audioRecurso: [null,],
        audioPersonal: [null,],
        iluminacionRecurso: [null,],
        iluminacionPersonal: [null,],
        transporteEnlaceServicio: [null,],
        energiaServicio: [null,],
        acServicio: [null,],
        maquillajeServicio: [null,],
        utileriaServicio: [null,],
        tramoyaServicio: [null,],
        supervisorServicio: [null,],
        confirmaProd: [null,],
        produccion: this.fb.group({
          areaProduccion: [this.data.detalleeventoOperaciones.produccion.areaProduccion, Validators.required],
          responsableProduccion: [this.data.detalleeventoOperaciones.produccion.responsableProduccion, Validators.required],
          pgmProduccion: [this.data.detalleeventoOperaciones.produccion.pgmProduccion, Validators.required],
          tipopgmProduccion: [this.data.detalleeventoOperaciones.produccion.tipopgmProduccion, Validators.required],
        })
      })
    });
    }
}

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
    private operacionesForm1ServicioService: OperacionesForm1ServicioService,
    public dialog: MatDialog
    ) {
      this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
    }
  ngOnInit() { }
  filaSeleccionada(row: any) {
    // console.log(row);
    this.openDialog(row);
  }
  openDialog(row): void {
    const dialogRef = this.dialog.open(IncidenciaDialogComponent, {
      width: '1200px',
      data: row
      // data: {name: row.respevento, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
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







