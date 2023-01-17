import { TestBed, inject } from '@angular/core/testing';
import { InterviewService } from './interview.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Service: Interview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([InterviewService], (service: InterviewService) => {
    expect(service).toBeTruthy();
  }));
});
