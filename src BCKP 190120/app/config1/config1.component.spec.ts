import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Config1Component } from './config1.component';

describe('Config1Component', () => {
  let component: Config1Component;
  let fixture: ComponentFixture<Config1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Config1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Config1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
