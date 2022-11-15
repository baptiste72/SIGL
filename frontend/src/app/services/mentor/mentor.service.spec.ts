/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MentorService } from './mentor.service';

describe('Service: Mentor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MentorService]
    });
  });

  it('should ...', inject([MentorService], (service: MentorService) => {
    expect(service).toBeTruthy();
  }));
});
