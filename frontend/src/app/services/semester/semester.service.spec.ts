import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SemesterService } from './semester.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SemesterService', () => {
  let service: SemesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SemesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
