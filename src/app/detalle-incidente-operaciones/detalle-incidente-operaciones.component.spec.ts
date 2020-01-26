import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleIncidenteOperacionesComponent } from './detalle-incidente-operaciones.component';

describe('DetalleIncidenteOperacionesComponent', () => {
  let component: DetalleIncidenteOperacionesComponent;
  let fixture: ComponentFixture<DetalleIncidenteOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleIncidenteOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleIncidenteOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
