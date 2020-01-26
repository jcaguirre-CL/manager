import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEventosOperacionesComponent } from './lista-eventos-operaciones.component';

describe('ListaEventosOperacionesComponent', () => {
  let component: ListaEventosOperacionesComponent;
  let fixture: ComponentFixture<ListaEventosOperacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEventosOperacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEventosOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
