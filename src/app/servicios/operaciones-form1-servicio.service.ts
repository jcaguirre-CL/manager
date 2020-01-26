
// @Injectable({
//   providedIn: 'root'
// })

import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperacionesForm1ValidadorService } from './operaciones-form1-validador.service';
import { IEventoFormInterface, IToppingItem, PizzaSizeEnum, PizzaToppingsEnum } from './evento-operaciones.interface';

@Injectable()
export class OperacionesForm1ServicioService {
  public availableToppings = [...Object.values(PizzaToppingsEnum)];
  public form: FormGroup;

  constructor(
    private operacionesForm1ValidadorService: OperacionesForm1ValidadorService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      selectedPizza: null,
      pizzas: this.fb.array([]),
      customerDetails: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        address: this.fb.group({
          street: [null, Validators.required],
          houseNum: [null, Validators.required],
          city: [null, Validators.required],
          floor: [null, Validators.required],
        })
      })
    }, {
      validator: this.operacionesForm1ValidadorService.formValidator()
    });
  }

  get pizzasArray(): FormArray {
    return this.form.get('pizzas') as FormArray;
  }

  get isValid(): boolean {
    if (!this.form.valid) {
      this.operacionesForm1ValidadorService.validateAllFormFields(this.form);
      return false;
    }

    return true;
  }

  selectPizzaForEdit(index: number) {
    this.form.get('selectedPizza').setValue(index);
  }

  addPizza(): FormGroup {
    const pizzaGroup = this.getPizzaFormGroup();
    this.pizzasArray.push(this.getPizzaFormGroup());

    this.form.markAsDirty();

    return pizzaGroup;
  }

  deletePizza(index: number): void {
    this.pizzasArray.removeAt(index);
    this.form.markAsDirty();
  }

  getPizzaFormGroup(size: PizzaSizeEnum = PizzaSizeEnum.MEDIUM): FormGroup {
    return this.fb.group({
      size: [size],
      toppings: this.mapToCheckboxArrayGroup(this.availableToppings)
    }, {
      validator: this.operacionesForm1ValidadorService.pizzaItemValidator()
    });
  }

  /**
   * Creates a pizza DTO Object using the server pizza interface
   * In this example it is the same except the toppings array,
   * so for simplicity i used the same interface,
   * usually the return object will be of different type
   */
  createPizzaOrderDto(data: IEventoFormInterface): IEventoFormInterface {
    const order = {
      customerDetails: data.customerDetails,
      pizzas: data.pizzas
    };

    for (const pizza of order.pizzas) {
      pizza.toppings = this.getSelectedToppings(pizza.toppings as IToppingItem[])
        .map((i) => {
          return i.name;
        });
    }

    return order;
  }

  getSelectedToppings(toppings: IToppingItem[]): IToppingItem[] {
    return toppings.filter(i => i.selected);
  }

  resetForm() {
    while (this.pizzasArray.length) {
      this.pizzasArray.removeAt(0);
    }

    this.form.reset();
  }

  /**
   * Create a mapping of a string based dataset
   * to a form array suitable for a multi checkbox array selection.
   * this provides a more concise solution
   * as oppose to working with [true, false, false, true]
   */
  private mapToCheckboxArrayGroup(data: string[]): FormArray {
    return this.fb.array(data.map((i) => {
      return this.fb.group({
        name: i,
        selected: false
      });
    }));
  }
}
