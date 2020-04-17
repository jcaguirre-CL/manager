import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-detalle-incidente-operaciones',
  templateUrl: './detalle-incidente-operaciones.component.html',
  styleUrls: ['./detalle-incidente-operaciones.component.css']
})
export class DetalleIncidenteOperacionesComponent implements OnInit {
  @Input() selectedIncidenteGroup: AbstractControl;
  @Output() addIncidente = new EventEmitter();

  get detallesArray(): FormArray {
    if (!this.selectedIncidenteGroup) return;

    return this.selectedIncidenteGroup.get('detalles') as FormArray;
  }

  constructor() { }

  ngOnInit() {

  }

}



