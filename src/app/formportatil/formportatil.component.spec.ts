import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormportatilComponent } from './formportatil.component';

describe('FormportatilComponent', () => {
  let component: FormportatilComponent;
  let fixture: ComponentFixture<FormportatilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormportatilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormportatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
