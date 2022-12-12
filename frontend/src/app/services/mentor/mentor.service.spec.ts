import { TestBed, async, inject } from '@angular/core/testing';
import { MentorService } from './mentor.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Mentor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MentorService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([MentorService], (service: MentorService) => {
    expect(service).toBeTruthy();
  }));
});
