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

export interface Responsable {
  flag: string;
  nombre: string;
  empresa: string;
}

interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-detalle-evento-operaciones',
  templateUrl: './detalle-evento-operaciones.component.html',
  styleUrls: ['./detalle-evento-operaciones.component.css'],
  providers: [NgbPopoverConfig]
})

export class DetalleEventoOperacionesComponent implements OnInit {

  @Input() selectedEventGroup: AbstractControl;
  @Input() group: FormGroup;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = true;
  checkedCamaraCamara = false;
  disabledCamaraCamara = true;
  checkedCamaraPluma = false;
  disabledCamaraPluma = true;
  checkedCamaraSteady = false;
  disabledCamaraSteady = true;
  checkedCamaraPersonal = false;
  disabledCamaraPersonal = true;

  panelOpenState = false;

  // GRAB USR AUTH RESPPROD
  public mycurrentUser: User;

  responsableCtrl = new FormControl();
  filteredResponsables: Observable<Responsable[]>;

    areas: Area[] = [
      {value: 'PRENSA', viewValue: 'PRENSA'},
      {value: 'BIENVENIDOS', viewValue: 'BIENVENIDOS'},
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
    this.group.controls['camaraCamara'].setValue('NA')
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
        this.group.controls['camaraCamara'].setValue('MAL')
      }
      else{
        this.group.controls['camaraCamara'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraPluma = true;
      this.group.controls['camaraCamara'].setValue('NA')
    }
  }
  onToggleChangeCamaraPluma() {
    this.checkedCamaraPluma = !this.checkedCamaraPluma;
    if(this.checkedCamaraPluma){
      this.group.controls['camaraCamara'].setValue('MAL')
    }
    else{
      this.group.controls['camaraCamara'].setValue('BIEN')
    }
  } 
  onChangeCamaraSteady(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraSteady = false;
      if(this.checkedCamaraSteady){
        this.group.controls['camaraCamara'].setValue('MAL')
      }
      else{
        this.group.controls['camaraCamara'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraSteady = true;
      this.group.controls['camaraCamara'].setValue('NA')
    }
  }
  onToggleChangeCamaraSteady() {
    this.checkedCamaraSteady = !this.checkedCamaraSteady;
    if(this.checkedCamaraSteady){
      this.group.controls['camaraCamara'].setValue('MAL')
    }
    else{
      this.group.controls['camaraCamara'].setValue('BIEN')
    }
  } 
  onChangeCamaraPersonal(ob: MatCheckboxChange) {
    if(ob.checked){
      this.disabledCamaraPersonal = false;
      if(this.checkedCamaraPersonal){
        this.group.controls['camaraCamara'].setValue('MAL')
      }
      else{
        this.group.controls['camaraCamara'].setValue('BIEN')
      }
    }
    else
    {
      this.disabledCamaraPersonal = true;
      this.group.controls['camaraCamara'].setValue('NA')
    }
  }
  onToggleChangeCamaraPersonal() {
    this.checkedCamaraPersonal = !this.checkedCamaraPersonal;
    if(this.checkedCamaraPersonal){
      this.group.controls['camaraCamara'].setValue('MAL')
    }
    else{
      this.group.controls['camaraCamara'].setValue('BIEN')
    }
  } 
  private _filterResponsables(value: string): Responsable[] {
    const filterValue = value.toLowerCase();

    return this.responsables.filter(responsable => responsable.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

}
