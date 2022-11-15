/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TutorService } from './tutor.service';

describe('Service: Tutor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TutorService]
    });
  });

  it('should ...', inject([TutorService], (service: TutorService) => {
    expect(service).toBeTruthy();
  }));
});
