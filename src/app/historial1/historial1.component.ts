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
import { MatTableDataSource } from '@angular/material/table';


import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'incidencia-dialog',
  templateUrl: 'incidencia.dialog.component.html',
  styleUrls: ['./incidencia.dialog.component.css'],
  providers: [
    OperacionesForm1ServicioService,
    OperacionesForm1ValidadorService
  ]
})
export class IncidenciaDialogComponent implements OnInit {
  incidenciaDialogForm: FormGroup;
  // operacionesForm1ServicioService: OperacionesForm1ServicioService;

  constructor(
    private fb: FormBuilder,
    private operacionesForm1ServicioService: OperacionesForm1ServicioService,    
    public dialogRef: MatDialogRef<IncidenciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IIncidenteFormInterface) {
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
      id: this.data.id,
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
        obsEvento: [this.data.detalleeventoOperaciones.obsEvento,],
        camaraCamara: [this.data.detalleeventoOperaciones.camaraCamara,],
        camaraPluma: [this.data.detalleeventoOperaciones.camaraPluma,],
        camaraSteady: [this.data.detalleeventoOperaciones.camaraSteady,],
        camaraRiel: [this.data.detalleeventoOperaciones.camaraRiel,],
        camaraDron: [this.data.detalleeventoOperaciones.camaraDron,],
        camaraPersonal: [this.data.detalleeventoOperaciones.camaraPersonal,],
        videoComunicaciones: [this.data.detalleeventoOperaciones.videoComunicaciones,],
        videoPantallas: [this.data.detalleeventoOperaciones.videoPantallas,],
        videoSwitch: [this.data.detalleeventoOperaciones.videoSwitch,],
        videoPersonal: [this.data.detalleeventoOperaciones.videoPersonal,],
        playRecurso: [this.data.detalleeventoOperaciones.playRecurso,],
        playContenido: [this.data.detalleeventoOperaciones.playContenido,],
        playPersonal: [this.data.detalleeventoOperaciones.playPersonal,],
        graficaRecurso: [this.data.detalleeventoOperaciones.graficaRecurso,],
        graficaContenido: [this.data.detalleeventoOperaciones.graficaContenido,],
        graficaPersonal: [this.data.detalleeventoOperaciones.graficaPersonal,],
        audioRecurso: [this.data.detalleeventoOperaciones.audioRecurso,],
        audioPersonal: [this.data.detalleeventoOperaciones.audioPersonal,],
        iluminacionRecurso: [this.data.detalleeventoOperaciones.iluminacionRecurso,],
        iluminacionPersonal: [this.data.detalleeventoOperaciones.iluminacionPersonal,],
        transporteEnlaceServicio: [this.data.detalleeventoOperaciones.transporteEnlaceServicio,],
        energiaServicio: [this.data.detalleeventoOperaciones.energiaServicio,],
        acServicio: [this.data.detalleeventoOperaciones.acServicio,],
        maquillajeServicio: [this.data.detalleeventoOperaciones.maquillajeServicio,],
        utileriaServicio: [this.data.detalleeventoOperaciones.utileriaServicio,],
        tramoyaServicio: [this.data.detalleeventoOperaciones.tramoyaServicio,],
        supervisorServicio: [this.data.detalleeventoOperaciones.supervisorServicio,],
        confirmaProd: [this.data.detalleeventoOperaciones.confirmaProd,],
        obsEventoProduccion: [this.data.detalleeventoOperaciones.obsEventoProduccion,],
        produccion: this.fb.group({
          areaProduccion: [this.data.detalleeventoOperaciones.produccion.areaProduccion, Validators.required],
          responsableProduccion: [this.data.detalleeventoOperaciones.produccion.responsableProduccion, Validators.required],
          pgmProduccion: [this.data.detalleeventoOperaciones.produccion.pgmProduccion, Validators.required],
          tipopgmProduccion: [this.data.detalleeventoOperaciones.produccion.tipopgmProduccion, Validators.required],
        })
      })
    });
    }

  async submit() {
      this.operacionesForm1ServicioService.modifyIncidenteEventoDto(this.incidenciaDialogForm.value, 'SI')
      this.incidenciaDialogForm.reset();
      this.dialogRef.close();
    }
  async submit_no() {
    this.operacionesForm1ServicioService.modifyIncidenteEventoDto(this.incidenciaDialogForm.value, 'NO')
    this.incidenciaDialogForm.reset();
    this.dialogRef.close();
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
    this.openDialog(row);
  }

  public doFilter = (value: string) => {
    // this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(IncidenciaDialogComponent, {
      width: '1200px',
      data: row
      // data: {name: row.respevento, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataSource = new RegistroDataSource(this.operacionesForm1ServicioService);
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







