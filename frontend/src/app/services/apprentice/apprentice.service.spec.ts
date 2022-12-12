/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApprenticeService } from './apprentice.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Apprentice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprenticeService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule], 
    });
  });

  it('should ...', inject([ApprenticeService], (service: ApprenticeService) => {
    expect(service).toBeTruthy();
  }));
});
