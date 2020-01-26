import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Opc1OperacionesComponent } from './opc1-operaciones.component';

describe('Opc1OperacionesComponent', () => {
  let component: Opc1OperacionesComponent;
  let fixture: ComponentFixture<Opc1OperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Opc1OperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Opc1OperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
