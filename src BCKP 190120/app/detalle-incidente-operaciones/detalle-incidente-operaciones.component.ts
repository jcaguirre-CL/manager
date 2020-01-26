import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-detalle-incidente-operaciones',
  templateUrl: './detalle-incidente-operaciones.component.html',
  styleUrls: ['./detalle-incidente-operaciones.component.css']
})
export class DetalleIncidenteOperacionesComponent implements OnInit {
  @Input() selectedPizzaGroup: AbstractControl;
  @Output() addPizza = new EventEmitter();

  get toppingsArray(): FormArray {
    if (!this.selectedPizzaGroup) return;

    return this.selectedPizzaGroup.get('toppings') as FormArray;
  }

  constructor() { }

  ngOnInit() {

  }

}



