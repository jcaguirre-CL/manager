import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

export interface Responsable {
  flag: string;
  nombre: string;
  empresa: string;
}

interface Area {
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
  // providers: [NgbPopoverConfig, {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},]

  providers: [NgbPopoverConfig,
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
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
  disabledCamaraSteady = false;
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

  panelOpenState = false;

  // GRAB USR AUTH RESPPROD
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
    private authenticationService: AuthenticationService)
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

  ngOnInit() {
    // CHECK CAMARA 
    this.disabledCamaraCamara = false;
    this.group.controls['camaraCamara'].setValue('BIEN');
    this.disabledCamaraPluma = false;
    this.group.controls['camaraPluma'].setValue('BIEN');
    this.disabledCamaraSteady = false;
    this.group.controls['camaraSteady'].setValue('BIEN');
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

  private _filterResponsables(value: string): Responsable[] {
    const filterValue = value.toLowerCase();

    return this.responsables.filter(responsable => responsable.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

}
