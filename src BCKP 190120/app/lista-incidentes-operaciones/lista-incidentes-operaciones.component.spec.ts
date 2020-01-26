import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaIncidentesOperacionesComponent } from './lista-incidentes-operaciones.component';

describe('ListaIncidentesOperacionesComponent', () => {
  let component: ListaIncidentesOperacionesComponent;
  let fixture: ComponentFixture<ListaIncidentesOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaIncidentesOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaIncidentesOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
