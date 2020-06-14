import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AbstractControl, FormArray } from '@angular/forms';

//EVALUAR PARA RESCATAR RESPPRODUCCION
import { AuthenticationService } from '../login-containers/_services';
import { User } from '../login-containers/_models';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

export interface Responsable {
  flag: string;
  nombre: string;
  empresa: string;
}

interface Area {
  value: string;
  viewValue: string;
}

interface ResponsableProduccion {
  value: string;
  viewValue: string;
}

interface TipoPrograma {
  value: string;
  viewValue: string;
}
interface NombrePrograma {
  value: string;
  viewValue: string;
}

interface AtencionEmpresas {
  value: string;
  viewValue: string;
}

interface AtrasoIn {
  value: string;
  viewValue: string;
}

interface AtrasoOut {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-evento-operaciones',
  templateUrl: './detalle-evento-operaciones.component.html',
  styleUrls: ['./detalle-evento-operaciones.component.css'],

  providers: [NgbPopoverConfig,
    {provide: MAT_DATE_LOCALE, useValue: 'es'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})

export class DetalleEventoOperacionesComponent implements OnInit {

  @Input() selectedEventGroup: AbstractControl;
  @Input() group: FormGroup;

  name_dialog: string;

  tipoprogramas: TipoPrograma[] = [
    {value: 'Noticia', viewValue: 'Noticia'},
    {value: 'Matinal', viewValue: 'Matinal'},
    {value: 'Franjeado', viewValue: 'Franjeado'},
    {value: 'Estelar', viewValue: 'Estelar'},
    {value: 'Reportaje', viewValue: 'Reportaje'},
    {value: 'Entretención', viewValue: 'Entretención'},
    {value: 'Otro', viewValue: 'Otro'}
  ];
  nombreprogramas: NombrePrograma[] = [
    {value: 'Teletrece', viewValue: 'Teletrece'},
    {value: 'Teletrece Tarde', viewValue: 'Teletrece Tarde'},
    {value: 'Bienvenidos', viewValue: 'Bienvenidos'},
    {value: 'Sigamos de largo', viewValue: 'Sigamos de Largo'},
    {value: 'Desarrollo', viewValue: 'Desarrollo'}
  ];

  atencionempresas: AtencionEmpresas[] = [
    {value: 'Secuoya', viewValue: 'Secuoya'},
    {value: 'AGTV', viewValue: 'AGTV'},
    {value: 'Bizarro', viewValue: 'Bizarro'},
    {value: 'Otro', viewValue: 'Otro'}
  ];

  atrasoins: AtrasoIn[] = [
    {value: 'No', viewValue: 'No'},
    {value: 'Produccion', viewValue: 'Produccion'},
    {value: 'Operaciones', viewValue: 'Operaciones'},
    {value: 'Ambos', viewValue: 'Ambos'}
  ];

  atrasoouts: AtrasoOut[] = [
    {value: 'No', viewValue: 'No'},
    {value: 'Produccion', viewValue: 'Produccion'},
    {value: 'Operaciones', viewValue: 'Operaciones'},
    {value: 'Ambos', viewValue: 'Ambos'}
  ];
  selectedAtrasoIn = this.atrasoins[0].value;
  selectedAtrasoOut = this.atrasoouts[0].value;
  color: ThemePalette = 'accent';
  defaultchecked: boolean = true;
  checked = false;
  disabled = true;
  checkedCamaraCamara = false;
  disabledCamaraCamara = false;
  checkedCamaraPluma = false;
  disabledCamaraPluma = false;
  checkedCamaraSteady = false;
  disabledCamaraSteady = true;
  checkedCamaraRiel = false;
  disabledCamaraRiel = true;
  checkedCamaraDron = false;
  disabledCamaraDron = true;
  checkedCamaraPersonal = false;
  disabledCamaraPersonal = false;

  checkedVideoComunicaciones = false;
  disabledVideoComunicaciones = false;
  checkedVideoPantallas = false;
  disabledVideoPantallas = false;
  checkedVideoSwitch = false;
  disabledVideoSwitch = false;
  checkedVideoPersonal = false;
  disabledVideoPersonal = false;

  checkedPlayRecurso = false;
  disabledPlayRecurso = true;
  checkedPlayContenido = false;
  disabledPlayContenido = true;
  checkedPlayPersonal = false;
  disabledPlayPersonal = true;

  checkedGraficaRecurso = false;
  disabledGraficaRecurso = true;
  checkedGraficaContenido = false;
  disabledGraficaContenido = true;
  checkedGraficaPersonal = false;
  disabledGraficaPersonal = true;

  checkedAudioRecurso = false;
  disabledAudioRecurso = true;
  checkedAudioPersonal = false;
  disabledAudioPersonal = true;

  checkedIluminacionRecurso = false;
  disabledIluminacionRecurso = true;
  checkedIluminacionPersonal = false;
  disabledIluminacionPersonal = true;

  checkedTransporteEnlaceServicio = false;
  disabledTransporteEnlaceServicio = true;

  checkedEnergiaServicio = false;
  disabledEnergiaServicio = false;

  checkedACServicio = false;
  disabledACServicio = false;

  checkedMaquillajeServicio = false;
  disabledMaquillajeServicio = true;

  checkedUtileriaServicio = false;
  disabledUtileriaServicio = true;

  checkedTramoyaServicio = false;
  disabledTramoyaServicio = true;

  checkedSupervisorServicio = false;
  disabledSupervisorServicio = false;

  panelOpenState = false;

  public mycurrentUser: User;

  responsableCtrl = new FormControl();
  filteredResponsables: Observable<Responsable[]>;

  areas: Area[] = [
    {value: 'PRENSA', viewValue: 'PRENSA'},
    {value: 'MATINAL', viewValue: 'MATINAL'},
    {value: 'ENTRETENCION', viewValue: 'ENTRETENCION'},
    {value: 'DOCU_REALIDAD', viewValue: 'DOCU REALIDAD'},
    {value: 'FICCION', viewValue: 'FICCION'},
    {value: 'CULTURA_REPORTAJES', viewValue: 'CULTURA Y REPORTAJES'},
    {value: 'DEPORTES', viewValue: 'DEPORTES'},
    {value: 'COMERCIAL', viewValue: 'COMERCIAL'},
    {value: 'SENALES', viewValue: 'SENALES'},
    {value: 'MEDIOS_DIGITALES', viewValue: 'MEDIOS DIGITALES'},
    {value: 'INGENIERIA', viewValue: 'INGENIERIA'}
  ];

  responsables: Responsable[] = [
    {
      nombre: 'Ruben Mauna',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      nombre: 'Juan Carlos Aguirre',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      nombre: 'Julio Antonio Muga',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      nombre: 'Jorge Hayden Manríquez',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      nombre: 'Cristobal Catalan',
      empresa: 'Canal 13',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      nombre: 'Oscar Ibañez',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      nombre: 'Felipe Salazar',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      nombre: 'Ignacio Carreño',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      nombre: 'Silvia Bergon',
      empresa: 'Secuoya',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];

  // AUTH PARA GRAB RESPPROD
  constructor(config: NgbPopoverConfig,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog)
     {
    this.authenticationService.currentUser.subscribe(x => this.mycurrentUser = x);

    config.placement = 'top-left';
    config.triggers = 'hover';

    this.filteredResponsables = this.responsableCtrl.valueChanges
    .pipe(
      startWith(''),
      map(responsable => responsable ? this._filterResponsables(responsable) : this.responsables.slice())
    );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name_dialog}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.name_dialog = result;
    });
  }

  ngOnInit() {
    // DEFAULT VALUE
    this.group.controls['tipoLocacion'].setValue('ESTUDIO');
    this.group.controls['tipoOperacion'].setValue('VIVO');

    // CHECK CAMARA 
    this.disabledCamaraCamara = false;
    this.group.controls['camaraCamara'].setValue('BIEN');
    this.disabledCamaraPluma = false;
    this.group.controls['camaraPluma'].setValue('BIEN');
/*     this.disabledCamaraSteady = false;
    this.group.controls['camaraSteady'].setValue('BIEN');
    this.disabledCamaraRiel = false;
    this.group.controls['camaraRiel'].setValue('BIEN');
    this.disabledCamaraDron = false;
    this.group.controls['camaraDron'].setValue('BIEN'); */
    this.disabledCamaraPersonal = false;
    this.group.controls['camaraPersonal'].setValue('BIEN');

    // CHECK VIDEO 
    this.disabledVideoComunicaciones = false;
    this.group.controls['videoComunicaciones'].setValue('BIEN');
    this.disabledVideoPantallas = false;
    this.group.controls['videoPantallas'].setValue('BIEN');
    this.disabledVideoSwitch = false;
    this.group.controls['videoSwitch'].setValue('BIEN');
    this.disabledVideoPersonal = false;
    this.group.controls['videoPersonal'].setValue('BIEN');

    // CHECK PLAY
    this.disabledPlayRecurso = false;
    this.group.controls['playRecurso'].setValue('BIEN');
    this.disabledPlayContenido = false;
    this.group.controls['playContenido'].setValue('BIEN');
    this.disabledPlayPersonal = false;
    this.group.controls['playPersonal'].setValue('BIEN');

    // CHECK GRAFICA
    this.disabledGraficaRecurso = false;
    this.group.controls['graficaRecurso'].setValue('BIEN');
    this.disabledGraficaContenido = false;
    this.group.controls['graficaContenido'].setValue('BIEN');
    this.disabledGraficaPersonal = false;
    this.group.controls['graficaPersonal'].setValue('BIEN');

    this.disabledACServicio = false;
    this.group.controls['acServicio'].setValue('BIEN');

    this.disabledEnergiaServicio = false;
    this.group.controls['energiaServicio'].setValue('BIEN');

    // SUPERVISOR
    this.disabledSupervisorServicio = false;
    this.group.controls['supervisorServicio'].setValue('BIEN');

    this.group.controls['atencionEvento'].setValue('Secuoya');
  }
  
/*   {value: 'Noticia', viewValue: 'Noticia'},
  {value: 'Matinal', viewValue: 'Matinal'},
  {value: 'Franjeado', viewValue: 'Franjeado'},
  {value: 'Estelar', viewValue: 'Estelar'},
  {value: 'Reportaje', viewValue: 'Reportaje'},
  {value: 'Entretención', viewValue: 'Entretención'},
  {value: 'Otro', viewValue: 'Otro'}

  {value: 'PRENSA', viewValue: 'PRENSA'},
  {value: 'MATINAL', viewValue: 'MATINAL'},
  {value: 'ENTRETENCION', viewValue: 'ENTRETENCION'},
  {value: 'DOCU_REALIDAD', viewValue: 'DOCU REALIDAD'},
  {value: 'FICCION', viewValue: 'FICCION'},
  {value: 'CULTURA_REPORTAJES', viewValue: 'CULTURA Y REPORTAJES'},
  {value: 'DEPORTES', viewValue: 'DEPORTES'},
  {value: 'COMERCIAL', viewValue: 'COMERCIAL'},
  {value: 'SENALES', viewValue: 'SENALES'},
  {value: 'MEDIOS_DIGITALES', viewValue: 'MEDIOS DIGITALES'},
  {value: 'INGENIERIA', viewValue: 'INGENIERIA'} */

  changeNombrePrograma(ob: MatSelectChange) {
    let changeNombrePrograma = this.group.controls.produccion as FormArray;
    if(ob.value=='Teletrece'){
      changeNombrePrograma.controls['areaProduccion'].setValue('PRENSA');
      changeNombrePrograma.controls['tipopgmProduccion'].setValue('Noticia');
    }
    if(ob.value=='Teletrece Tarde'){
      changeNombrePrograma.controls['areaProduccion'].setValue('PRENSA');
      changeNombrePrograma.controls['tipopgmProduccion'].setValue('Noticia');
    }
    if(ob.value=='Bienvenidos'){
      changeNombrePrograma.controls['areaProduccion'].setValue('MATINAL');
      changeNombrePrograma.controls['tipopgmProduccion'].setValue('Franjeado');
    }
    if(ob.value=='Sigamos de largo'){
      changeNombrePrograma.controls['areaProduccion'].setValue('ENTRETENCION');
      changeNombrePrograma.controls['tipopgmProduccion'].setValue('Franjeado');
    }
    if(ob.value=='Desarrollo'){
      changeNombrePrograma.controls['areaProduccion'].setValue('INGENIERIA');
      changeNombrePrograma.controls['tipopgmProduccion'].setValue('Otro');
    }
  }
  onChange(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraCamara = false;
      if(this.checkedCamaraCamara){
        this.group.controls['camaraCamara'].setValue('MAL')
      }
      else{
        this.group.controls['camaraCamara'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraCamara = true;
      this.group.controls['camaraCamara'].setValue('NA')
    }
  }
  onToggleChange() {
    this.checkedCamaraCamara = !this.checkedCamaraCamara;
    if(this.checkedCamaraCamara){
      this.group.controls['camaraCamara'].setValue('MAL')
    }
    else{
      this.group.controls['camaraCamara'].setValue('BIEN')
    }
  } 
  onChangeCamaraPluma(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraPluma = false;
      if(this.checkedCamaraPluma){
        this.group.controls['camaraPluma'].setValue('MAL')
      }
      else{
        this.group.controls['camaraPluma'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraPluma = true;
      this.group.controls['camaraPluma'].setValue('NA')
    }
  }
  onToggleChangeCamaraPluma() {
    this.checkedCamaraPluma = !this.checkedCamaraPluma;
    if(this.checkedCamaraPluma){
      this.group.controls['camaraPluma'].setValue('MAL')
    }
    else{
      this.group.controls['camaraPluma'].setValue('BIEN')
    }
  } 
  onChangeCamaraSteady(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraSteady = false;
      if(this.checkedCamaraSteady){
        this.group.controls['camaraSteady'].setValue('MAL')
      }
      else{
        this.group.controls['camaraSteady'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraSteady = true;
      this.group.controls['camaraSteady'].setValue('NA')
    }
  }
  onToggleChangeCamaraSteady() {
    this.checkedCamaraSteady = !this.checkedCamaraSteady;
    if(this.checkedCamaraSteady){
      this.group.controls['camaraSteady'].setValue('MAL')
    }
    else{
      this.group.controls['camaraSteady'].setValue('BIEN')
    }
  } 

  onChangeCamaraRiel(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraRiel = false;
      if(this.checkedCamaraRiel){
        this.group.controls['camaraRiel'].setValue('MAL')
      }
      else{
        this.group.controls['camaraRiel'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraRiel = true;
      this.group.controls['camaraRiel'].setValue('NA')
    }
  }
  onToggleChangeCamaraRiel() {
    this.checkedCamaraRiel = !this.checkedCamaraRiel;
    if(this.checkedCamaraRiel){
      this.group.controls['camaraRiel'].setValue('MAL')
    }
    else{
      this.group.controls['camaraRiel'].setValue('BIEN')
    }
  } 

  onChangeCamaraDron(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraDron = false;
      if(this.checkedCamaraDron){
        this.group.controls['camaraDron'].setValue('MAL')
      }
      else{
        this.group.controls['camaraDron'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraDron = true;
      this.group.controls['camaraDron'].setValue('NA')
    }
  }
  onToggleChangeCamaraDron() {
    this.checkedCamaraDron = !this.checkedCamaraDron;
    if(this.checkedCamaraDron){
      this.group.controls['camaraDron'].setValue('MAL')
    }
    else{
      this.group.controls['camaraDron'].setValue('BIEN')
    }
  } 

  onChangeCamaraPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraPersonal = false;
      if(this.checkedCamaraPersonal){
        this.group.controls['camaraPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['camaraPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraPersonal = true;
      this.group.controls['camaraPersonal'].setValue('NA')
    }
  }
  onToggleChangeCamaraPersonal() {
    this.checkedCamaraPersonal = !this.checkedCamaraPersonal;
    if(this.checkedCamaraPersonal){
      this.group.controls['camaraPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['camaraPersonal'].setValue('BIEN')
    }
  } 

  onChangeVideoComunicaciones(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledVideoComunicaciones = false;
      if(this.checkedVideoComunicaciones){
        this.group.controls['videoComunicaciones'].setValue('MAL')
      }
      else{
        this.group.controls['videoComunicaciones'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledVideoComunicaciones = true;
      this.group.controls['videoComunicaciones'].setValue('NA')
    }
  }
  onToggleChangeVideoComunicaciones() {
    this.checkedVideoComunicaciones = !this.checkedVideoComunicaciones;
    if(this.checkedVideoComunicaciones){
      this.group.controls['videoComunicaciones'].setValue('MAL')
    }
    else{
      this.group.controls['videoComunicaciones'].setValue('BIEN')
    }
  } 

  onChangeVideoPantallas(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledVideoPantallas = false;
      if(this.checkedVideoPantallas){
        this.group.controls['videoPantallas'].setValue('MAL')
      }
      else{
        this.group.controls['videoPantallas'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledVideoPantallas = true;
      this.group.controls['videoPantallas'].setValue('NA')
    }
  }
  onToggleChangeVideoPantallas() {
    this.checkedVideoPantallas = !this.checkedVideoPantallas;
    if(this.checkedVideoPantallas){
      this.group.controls['videoPantallas'].setValue('MAL')
    }
    else{
      this.group.controls['videoPantallas'].setValue('BIEN')
    }
  } 

  onChangeVideoSwitch(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledVideoSwitch = false;
      if(this.checkedVideoSwitch){
        this.group.controls['videoSwitch'].setValue('MAL')
      }
      else{
        this.group.controls['videoSwitch'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledVideoSwitch = true;
      this.group.controls['videoSwitch'].setValue('NA')
    }
  }
  onToggleChangeVideoSwitch() {
    this.checkedVideoSwitch = !this.checkedVideoSwitch;
    if(this.checkedVideoSwitch){
      this.group.controls['videoSwitch'].setValue('MAL')
    }
    else{
      this.group.controls['videoSwitch'].setValue('BIEN')
    }
  } 

  onChangeVideoPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledVideoPersonal = false;
      if(this.checkedVideoPersonal){
        this.group.controls['videoPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['videoPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledVideoPersonal = true;
      this.group.controls['videoPersonal'].setValue('NA')
    }
  }
  onToggleChangeVideoPersonal() {
    this.checkedVideoPersonal = !this.checkedVideoPersonal;
    if(this.checkedVideoPersonal){
      this.group.controls['videoPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['videoPersonal'].setValue('BIEN')
    }
  } 

  onChangePlayRecurso(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledPlayRecurso = false;
      if(this.checkedPlayRecurso){
        this.group.controls['playRecurso'].setValue('MAL')
      }
      else{
        this.group.controls['playRecurso'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledPlayRecurso = true;
      this.group.controls['playRecurso'].setValue('NA')
    }
  }
  onToggleChangePlayRecurso() {
    this.checkedPlayRecurso = !this.checkedPlayRecurso;
    if(this.checkedPlayRecurso){
      this.group.controls['playRecurso'].setValue('MAL')
    }
    else{
      this.group.controls['playRecurso'].setValue('BIEN')
    }
  } 

  onChangePlayContenido(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledPlayContenido = false;
      if(this.checkedPlayContenido){
        this.group.controls['playContenido'].setValue('MAL')
      }
      else{
        this.group.controls['playContenido'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledPlayContenido = true;
      this.group.controls['playContenido'].setValue('NA')
    }
  }
  onToggleChangePlayContenido() {
    this.checkedPlayContenido = !this.checkedPlayContenido;
    if(this.checkedPlayContenido){
      this.group.controls['playContenido'].setValue('MAL')
    }
    else{
      this.group.controls['playContenido'].setValue('BIEN')
    }
  } 

  onChangePlayPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledPlayPersonal = false;
      if(this.checkedPlayPersonal){
        this.group.controls['playPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['playPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledPlayPersonal = true;
      this.group.controls['playPersonal'].setValue('NA')
    }
  }
  onToggleChangePlayPersonal() {
    this.checkedPlayPersonal = !this.checkedPlayPersonal;
    if(this.checkedPlayPersonal){
      this.group.controls['playPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['playPersonal'].setValue('BIEN')
    }
  }

  onChangeGraficaRecurso(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledGraficaRecurso = false;
      if(this.checkedGraficaRecurso){
        this.group.controls['graficaRecurso'].setValue('MAL')
      }
      else{
        this.group.controls['graficaRecurso'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledGraficaRecurso = true;
      this.group.controls['graficaRecurso'].setValue('NA')
    }
  }
  onToggleChangeGraficaRecurso() {
    this.checkedGraficaRecurso = !this.checkedGraficaRecurso;
    if(this.checkedGraficaRecurso){
      this.group.controls['graficaRecurso'].setValue('MAL')
    }
    else{
      this.group.controls['graficaRecurso'].setValue('BIEN')
    }
  } 

  onChangeGraficaContenido(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledGraficaContenido = false;
      if(this.checkedGraficaContenido){
        this.group.controls['graficaContenido'].setValue('MAL')
      }
      else{
        this.group.controls['graficaContenido'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledGraficaContenido = true;
      this.group.controls['graficaContenido'].setValue('NA')
    }
  }
  onToggleChangeGraficaContenido() {
    this.checkedGraficaContenido = !this.checkedGraficaContenido;
    if(this.checkedGraficaContenido){
      this.group.controls['graficaContenido'].setValue('MAL')
    }
    else{
      this.group.controls['graficaContenido'].setValue('BIEN')
    }
  } 

  onChangeGraficaPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledGraficaPersonal = false;
      if(this.checkedGraficaPersonal){
        this.group.controls['graficaPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['graficaPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledGraficaPersonal = true;
      this.group.controls['graficaPersonal'].setValue('NA')
    }
  }
  onToggleChangeGraficaPersonal() {
    this.checkedGraficaPersonal = !this.checkedGraficaPersonal;
    if(this.checkedGraficaPersonal){
      this.group.controls['graficaPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['graficaPersonal'].setValue('BIEN')
    }
  }

  onChangeAudioRecurso(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledAudioRecurso = false;
      if(this.checkedAudioRecurso){
        this.group.controls['audioRecurso'].setValue('MAL')
      }
      else{
        this.group.controls['audioRecurso'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledAudioRecurso = true;
      this.group.controls['audioRecurso'].setValue('NA')
    }
  }
  onToggleChangeAudioRecurso() {
    this.checkedAudioRecurso = !this.checkedAudioRecurso;
    if(this.checkedAudioRecurso){
      this.group.controls['audioRecurso'].setValue('MAL')
    }
    else{
      this.group.controls['audioRecurso'].setValue('BIEN')
    }
  } 

  onChangeAudioPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledAudioPersonal = false;
      if(this.checkedAudioPersonal){
        this.group.controls['audioPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['audioPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledAudioPersonal = true;
      this.group.controls['audioPersonal'].setValue('NA')
    }
  }
  onToggleChangeAudioPersonal() {
    this.checkedAudioPersonal = !this.checkedAudioPersonal;
    if(this.checkedAudioPersonal){
      this.group.controls['audioPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['audioPersonal'].setValue('BIEN')
    }
  }

  onChangeIluminacionRecurso(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledIluminacionRecurso = false;
      if(this.checkedIluminacionRecurso){
        this.group.controls['iluminacionRecurso'].setValue('MAL')
      }
      else{
        this.group.controls['iluminacionRecurso'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledIluminacionRecurso = true;
      this.group.controls['iluminacionRecurso'].setValue('NA')
    }
  }
  onToggleChangeIluminacionRecurso() {
    this.checkedIluminacionRecurso = !this.checkedIluminacionRecurso;
    if(this.checkedIluminacionRecurso){
      this.group.controls['iluminacionRecurso'].setValue('MAL')
    }
    else{
      this.group.controls['iluminacionRecurso'].setValue('BIEN')
    }
  } 

  onChangeIluminacionPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledIluminacionPersonal = false;
      if(this.checkedIluminacionPersonal){
        this.group.controls['iluminacionPersonal'].setValue('MAL')
      }
      else{
        this.group.controls['iluminacionPersonal'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledIluminacionPersonal = true;
      this.group.controls['iluminacionPersonal'].setValue('NA')
    }
  }
  onToggleChangeIluminacionPersonal() {
    this.checkedIluminacionPersonal = !this.checkedIluminacionPersonal;
    if(this.checkedIluminacionPersonal){
      this.group.controls['iluminacionPersonal'].setValue('MAL')
    }
    else{
      this.group.controls['iluminacionPersonal'].setValue('BIEN')
    }
  }

  onChangeTransporteEnlaceServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledTransporteEnlaceServicio = false;
      if(this.checkedTransporteEnlaceServicio){
        this.group.controls['transporteEnlaceServicio'].setValue('MAL')
      }
      else{
        this.group.controls['transporteEnlaceServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabled = true;
      this.group.controls['transporteEnlaceServicio'].setValue('NA')
    }
  }
  onToggleChangeTransporteEnlaceServicio() {
    this.checkedTransporteEnlaceServicio = !this.checkedTransporteEnlaceServicio;
    if(this.checkedTransporteEnlaceServicio){
      this.group.controls['transporteEnlaceServicio'].setValue('MAL')
    }
    else{
      this.group.controls['transporteEnlaceServicio'].setValue('BIEN')
    }
  }

  onChangeEnergiaServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledEnergiaServicio = false;
      if(this.checkedEnergiaServicio){
        this.group.controls['energiaServicio'].setValue('MAL')
      }
      else{
        this.group.controls['energiaServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledEnergiaServicio = true;
      this.group.controls['energiaServicio'].setValue('NA')
    }
  }
  onToggleChangeEnergiaServicio() {
    this.checkedEnergiaServicio = !this.checkedEnergiaServicio;
    if(this.checkedEnergiaServicio){
      this.group.controls['energiaServicio'].setValue('MAL')
    }
    else{
      this.group.controls['energiaServicio'].setValue('BIEN')
    }
  }

  onChangeACServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledACServicio = false;
      if(this.checkedACServicio){
        this.group.controls['acServicio'].setValue('MAL')
      }
      else{
        this.group.controls['acServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledACServicio = true;
      this.group.controls['acServicio'].setValue('NA')
    }
  }
  onToggleChangeACServicio() {
    this.checkedACServicio = !this.checkedACServicio;
    if(this.checkedACServicio){
      this.group.controls['acServicio'].setValue('MAL')
    }
    else{
      this.group.controls['acServicio'].setValue('BIEN')
    }
  }

  onChangeMaquillajeServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledMaquillajeServicio = false;
      if(this.checkedMaquillajeServicio){
        this.group.controls['maquillajeServicio'].setValue('MAL')
      }
      else{
        this.group.controls['maquillajeServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledMaquillajeServicio = true;
      this.group.controls['maquillajeServicio'].setValue('NA')
    }
  }
  onToggleChangeMaquillajeServicio() {
    this.checkedMaquillajeServicio = !this.checkedMaquillajeServicio;
    if(this.checkedMaquillajeServicio){
      this.group.controls['maquillajeServicio'].setValue('MAL')
    }
    else{
      this.group.controls['maquillajeServicio'].setValue('BIEN')
    }
  }

  onChangeUtileriaServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledUtileriaServicio = false;
      if(this.checkedUtileriaServicio){
        this.group.controls['utileriaServicio'].setValue('MAL')
      }
      else{
        this.group.controls['utileriaServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledUtileriaServicio = true;
      this.group.controls['utileriaServicio'].setValue('NA')
    }
  }
  onToggleChangeUtileriaServicio() {
    this.checkedUtileriaServicio = !this.checkedUtileriaServicio;
    if(this.checkedUtileriaServicio){
      this.group.controls['utileriaServicio'].setValue('MAL')
    }
    else{
      this.group.controls['utileriaServicio'].setValue('BIEN')
    }
  }

  onChangeTramoyaServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledTramoyaServicio = false;
      if(this.checkedTramoyaServicio){
        this.group.controls['tramoyaServicio'].setValue('MAL')
      }
      else{
        this.group.controls['tramoyaServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledTramoyaServicio = true;
      this.group.controls['tramoyaServicio'].setValue('NA')
    }
  }
  onToggleChangeTramoyaServicio() {
    this.checkedTramoyaServicio = !this.checkedTramoyaServicio;
    if(this.checkedTramoyaServicio){
      this.group.controls['tramoyaServicio'].setValue('MAL')
    }
    else{
      this.group.controls['tramoyaServicio'].setValue('BIEN')
    }
  }

  onChangeSupervisorServicio(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledSupervisorServicio = false;
      if(this.checkedSupervisorServicio){
        this.group.controls['supervisorServicio'].setValue('MAL')
      }
      else{
        this.group.controls['supervisorServicio'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledSupervisorServicio = true;
      this.group.controls['supervisorServicio'].setValue('NA')
    }
  }
  onToggleChangeSupervisorServicio() {
    this.checkedSupervisorServicio = !this.checkedSupervisorServicio;
    if(this.checkedSupervisorServicio){
      this.group.controls['supervisorServicio'].setValue('MAL')
    }
    else{
      this.group.controls['supervisorServicio'].setValue('BIEN')
    }
  }

  private _filterResponsables(value: string): Responsable[] {
    const filterValue = value.toLowerCase();

    return this.responsables.filter(responsable => responsable.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

}
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog-overview.html',
  styleUrls: ['./detalle-evento-operaciones.component.css'],
})
export class DialogOverviewExampleDialog {
  responsables: ResponsableProduccion[] = [
    {value: 'Franjeado', viewValue: 'Alvaro Vásquez Yung'},
    {value: 'Matinal', viewValue: 'Lilian Pérez Rojas'},
    {value: 'Noticia', viewValue: 'Camila Cáceres'}
  ];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}