import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DeadlineService } from './deadline.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DeadlineService', () => {
  let service: DeadlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeadlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
