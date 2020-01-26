import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { IPizzaItem, IToppingItem, PizzaSizeEnum } from '../servicios/evento-operaciones.interface';
import { OperacionesForm1ServicioService } from '../servicios/operaciones-form1-servicio.service';

@Component({
  selector: 'app-lista-incidentes-operaciones',
  templateUrl: './lista-incidentes-operaciones.component.html',
  styleUrls: ['./lista-incidentes-operaciones.component.css']
})
export class ListaIncidentesOperacionesComponent implements OnInit {
  @Input() group: FormGroup;

  @Output() deletePizza = new EventEmitter<number>();
  @Output() addPizza = new EventEmitter();
  @Output() pizzaSelected = new EventEmitter<number>();

  get pizzasArray(): FormArray {
    return this.group.get('pizzas') as FormArray;
  }

  constructor(
    private operacionesForm1ServicioService : OperacionesForm1ServicioService
  ) { }

  ngOnInit() {
  }

  getPizzaListItemClassStates(pizza: AbstractControl, index: number) {
    return {
      'PizzaList__item--active': this.group.get('selectedPizza').value === index,
      'PizzaList__item--has-error': !pizza.valid && pizza.dirty
    };
  }

  getPizzaTitle(pizza: IPizzaItem): string {
    const selectedToppings = this.operacionesForm1ServicioService
      .getSelectedToppings((pizza.toppings as IToppingItem[]))
      .map(i => i.name);

    const toppingsString = this.getToppingsString(selectedToppings);
    const sizeString = this.getPizzaSizeTitle(pizza.size);

    return `Tipo Incidencia: ${sizeString}  ${toppingsString}`;
  }

  private getToppingsString(toppings: string[]): string {
    if (!toppings || !toppings.length) return '';

    return `- ${toppings.toString()}`;
  }

  private getPizzaSizeTitle(size: PizzaSizeEnum): string {
    let pizzaSize;
    switch (size) {
      case PizzaSizeEnum.SMALL:
        pizzaSize = 'Menor';
        break;
      case PizzaSizeEnum.MEDIUM:
        pizzaSize = 'Grave';
        break;
      case PizzaSizeEnum.LARGE:
        pizzaSize = 'Crítica';
        break;
    }

    return pizzaSize;
  }

}

