import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEventoOperacionesComponent } from './detalle-evento-operaciones.component';

describe('DetalleEventoOperacionesComponent', () => {
  let component: DetalleEventoOperacionesComponent;
  let fixture: ComponentFixture<DetalleEventoOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleEventoOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEventoOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
