import { TestBed } from '@angular/core/testing';

import { OpcoService } from './opco.service';

describe('ServiceService', () => {
  let service: OpcoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
