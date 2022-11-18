import { TestBed, inject } from '@angular/core/testing';
import { InterviewService } from './interview.service';

describe('Service: Interview', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InterviewService]
    });
  });

  it('should ...', inject([InterviewService], (service: InterviewService) => {
    expect(service).toBeTruthy();
  }));
});
