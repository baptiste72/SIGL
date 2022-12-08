import { TestBed, inject } from '@angular/core/testing';
import { TutorService } from './tutor.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Tutor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([TutorService], (service: TutorService) => {
    expect(service).toBeTruthy();
  }));
});
