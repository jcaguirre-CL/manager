import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteAreaPickerComponent } from './incidente-area-picker.component';

describe('IncidenteAreaPickerComponent', () => {
  let component: IncidenteAreaPickerComponent;
  let fixture: ComponentFixture<IncidenteAreaPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidenteAreaPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenteAreaPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
