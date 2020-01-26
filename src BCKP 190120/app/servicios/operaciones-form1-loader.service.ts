import { Injectable } from '@angular/core';
import { IEventoFormInterface, IToppingItem, PizzaToppingsEnum } from './evento-operaciones.interface';
import { OperacionesForm1ServicioService } from './operaciones-form1-servicio.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesForm1LoaderService {

  constructor(
    private operacionesForm1ServicioService: OperacionesForm1ServicioService
  ) {

  }

  loadPizzaForEdit(data: IEventoFormInterface): void {
    this.operacionesForm1ServicioService.form.patchValue({
      customerDetails: {
        ...data.customerDetails
      }
    });

    for (const pizza of data.pizzas) {
      const group = this.operacionesForm1ServicioService.addPizza();
      group.patchValue({
        size: pizza.size,
        toppings: this.prefillToppingsSelection(group.get('toppings').value, pizza.toppings as PizzaToppingsEnum[])
      });
    }
  }

  prefillToppingsSelection(toppings: IToppingItem[], selectedToppings: PizzaToppingsEnum[]): IToppingItem[] {
    return toppings.map((i) => {
      if (selectedToppings.includes(i.name)) {
        i.selected = true;
      }

      return i;
    });
  }
}
