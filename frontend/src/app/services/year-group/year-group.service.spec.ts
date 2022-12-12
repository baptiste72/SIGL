import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { YearGroupService } from './year-group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('YearGroupService', () => {
  let service: YearGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(YearGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
