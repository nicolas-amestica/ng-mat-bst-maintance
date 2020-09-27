import { TestBed } from '@angular/core/testing';

import { InstanciaService } from './instancia.service';

describe('InstanciaService', () => {
  let service: InstanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
