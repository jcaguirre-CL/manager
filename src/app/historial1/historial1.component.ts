import { Component, OnInit, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';
import { OperacionesForm1ValidadorService } from '../servicios/operaciones-form1-validador.service';
import { Observable, merge, fromEvent} from "rxjs";

import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';

import { DataSource } from '@angular/cdk/collections';
import { IIncidenteFormInterface } from '../servicios/evento-operaciones.interface';

import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';

import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import {LessonsDataSource} from "./datos.datasource";

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
  gestion: boolean = false;

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
    console.log(this.data["user"].perfil);
    if (this.data["user"].perfil == 'gestion' || this.data["user"].perfil == 'perfil') {
      this.gestion = true;
    }
    this.incidenciaDialogForm = this.fb.group({
      selectedIncidente: null,
      incidentes: this.data["data"].incidentes,
      id: this.data["data"].id,
      detalleeventoOperaciones: this.fb.group({
        fechaEvento: [this.data["data"].detalleeventoOperaciones.fechaEvento,],
        horaProgIni: [this.data["data"].detalleeventoOperaciones.horaProgIni,],
        horaProgFin: [this.data["data"].detalleeventoOperaciones.horaProgFin,],
        horaRealIni: [this.data["data"].detalleeventoOperaciones.horaRealIni,],
        horaRealFin: [this.data["data"].detalleeventoOperaciones.horaRealFin,],
        atrasoIni: [this.data["data"].detalleeventoOperaciones.atrasoIni,],
        atrasoFin: [this.data["data"].detalleeventoOperaciones.atrasoFin,],
        responsableEvento: [this.data["data"].detalleeventoOperaciones.responsableEvento,],
        atencionEvento: [this.data["data"].detalleeventoOperaciones.atencionEvento,],
        switchEvento: [this.data["data"].detalleeventoOperaciones.switchEvento,],
        locacionEvento: [this.data["data"].detalleeventoOperaciones.locacionEvento,],
        tipoOperacion: [this.data["data"].detalleeventoOperaciones.tipoOperacion,],
        tipoLocacion: [this.data["data"].detalleeventoOperaciones.tipoLocacion,],
        obsEvento: [this.data["data"].detalleeventoOperaciones.obsEvento,],
        camaraCamara: [this.data["data"].detalleeventoOperaciones.camaraCamara,],
        camaraPluma: [this.data["data"].detalleeventoOperaciones.camaraPluma,],
        camaraSteady: [this.data["data"].detalleeventoOperaciones.camaraSteady,],
        camaraRiel: [this.data["data"].detalleeventoOperaciones.camaraRiel,],
        camaraDron: [this.data["data"].detalleeventoOperaciones.camaraDron,],
        camaraPersonal: [this.data["data"].detalleeventoOperaciones.camaraPersonal,],
        videoComunicaciones: [this.data["data"].detalleeventoOperaciones.videoComunicaciones,],
        videoPantallas: [this.data["data"].detalleeventoOperaciones.videoPantallas,],
        videoSwitch: [this.data["data"].detalleeventoOperaciones.videoSwitch,],
        videoPersonal: [this.data["data"].detalleeventoOperaciones.videoPersonal,],
        playRecurso: [this.data["data"].detalleeventoOperaciones.playRecurso,],
        playContenido: [this.data["data"].detalleeventoOperaciones.playContenido,],
        playPersonal: [this.data["data"].detalleeventoOperaciones.playPersonal,],
        graficaRecurso: [this.data["data"].detalleeventoOperaciones.graficaRecurso,],
        graficaContenido: [this.data["data"].detalleeventoOperaciones.graficaContenido,],
        graficaPersonal: [this.data["data"].detalleeventoOperaciones.graficaPersonal,],
        audioRecurso: [this.data["data"].detalleeventoOperaciones.audioRecurso,],
        audioPersonal: [this.data["data"].detalleeventoOperaciones.audioPersonal,],
        iluminacionRecurso: [this.data["data"].detalleeventoOperaciones.iluminacionRecurso,],
        iluminacionPersonal: [this.data["data"].detalleeventoOperaciones.iluminacionPersonal,],
        transporteEnlaceServicio: [this.data["data"].detalleeventoOperaciones.transporteEnlaceServicio,],
        energiaServicio: [this.data["data"].detalleeventoOperaciones.energiaServicio,],
        acServicio: [this.data["data"].detalleeventoOperaciones.acServicio,],
        maquillajeServicio: [this.data["data"].detalleeventoOperaciones.maquillajeServicio,],
        utileriaServicio: [this.data["data"].detalleeventoOperaciones.utileriaServicio,],
        tramoyaServicio: [this.data["data"].detalleeventoOperaciones.tramoyaServicio,],
        supervisorServicio: [this.data["data"].detalleeventoOperaciones.supervisorServicio,],
        confirmaProd: [this.data["data"].detalleeventoOperaciones.confirmaProd,],
        obsEventoProduccion: [this.data["data"].detalleeventoOperaciones.obsEventoProduccion,],
        obsEventoGestion: [this.data["data"].detalleeventoOperaciones.obsEventoGestion,],
        nivelIncidencia: [this.data["data"].detalleeventoOperaciones.nivelIncidencia,],
        nivelImpacto: [this.data["data"].detalleeventoOperaciones.nivelImpacto,],
        estadoEvento: [this.data["data"].detalleeventoOperaciones.estadoEvento,],
        errorArea: [this.data["data"].detalleeventoOperaciones.errorArea,],
        produccion: this.fb.group({
          areaProduccion: [this.data["data"].detalleeventoOperaciones.produccion.areaProduccion, Validators.required],
          responsableProduccion: [this.data["data"].detalleeventoOperaciones.produccion.responsableProduccion, Validators.required],
          pgmProduccion: [this.data["data"].detalleeventoOperaciones.produccion.pgmProduccion, Validators.required],
          tipopgmProduccion: [this.data["data"].detalleeventoOperaciones.produccion.tipopgmProduccion, Validators.required],
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
  async submit_gestion() {
    this.operacionesForm1ServicioService.modifyIncidenteEventoDto(this.incidenciaDialogForm.value, 'SI')
    this.incidenciaDialogForm.reset();
    this.dialogRef.close();
  }
async submit_nogestion() {
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
export class Historial1Component implements OnInit, AfterViewInit {
  iincidenteFormInterface: IIncidenteFormInterface;
  displayedColumns: string[] = ['fecha', 'produccion', 'programa', 'responsable', 'aprobado', 'estado', 'estadoEvento'];
  isLoading = false;

  // dataSource = new RegistroDataSource(this.operacionesForm1ServicioService);
  dataSource2: LessonsDataSource;

  public mycurrentUser: User;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private authenticationService: AuthenticationService,
    private operacionesForm1ServicioService: OperacionesForm1ServicioService,
    public dialog: MatDialog
    ) {
      this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);
    }
  ngOnInit() { 
    this.dataSource2 = new LessonsDataSource(this.operacionesForm1ServicioService);

    this.dataSource2.loadLessons('');
  }

  filaSeleccionada(row: any) {
    this.openDialog(row);
  }

  openDialog(row: any): void {
    const dialogRef = this.dialog.open(IncidenciaDialogComponent, {
      width: '1200px',
      data: {
        data: row,
        user: this.mycurrentUser},
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.dataSource = new RegistroDataSource(this.operacionesForm1ServicioService);
      // this.dataSource2 = new LessonsDataSource(this.operacionesForm1ServicioService);
      this.ngOnInit();
    });
  }

  ngAfterViewInit() {

      fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                  this.loadLessonsPage();
              })
          )
          .subscribe();

  }

  loadLessonsPage() {
      this.dataSource2.loadLessons(this.input.nativeElement.value);
  }

}

/* export class RegistroDataSource extends DataSource<any> {

  constructor(private operacionesForm1ServicioService: OperacionesForm1ServicioService
    ) {
    super();
  }
  connect(): Observable<IIncidenteFormInterface[]> {
    return this.operacionesForm1ServicioService.getRegistrosInternos();
  }

  disconnect() { }
} */







