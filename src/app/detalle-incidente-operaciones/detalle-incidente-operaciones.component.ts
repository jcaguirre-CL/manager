import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-incidente-operaciones',
  templateUrl: './detalle-incidente-operaciones.component.html',
  styleUrls: ['./detalle-incidente-operaciones.component.scss'],
  providers: [NgbPopoverConfig]
})
export class DetalleIncidenteOperacionesComponent implements OnInit {
  @Input() selectedIncidenteGroup: AbstractControl;
  @Output() addIncidente = new EventEmitter();

  get detallesArray(): FormArray {
    if (!this.selectedIncidenteGroup) return;

    return this.selectedIncidenteGroup.get('detalles') as FormArray;
  }

  constructor(config: NgbPopoverConfig) { 
    config.placement = 'top-left';
    config.triggers = 'hover';
  }

  ngOnInit() {

  }

}



