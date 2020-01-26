import { TestBed } from '@angular/core/testing';

import { OperacionesForm1LoaderService } from './operaciones-form1-loader.service';

describe('OperacionesForm1LoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperacionesForm1LoaderService = TestBed.get(OperacionesForm1LoaderService);
    expect(service).toBeTruthy();
  });
});
