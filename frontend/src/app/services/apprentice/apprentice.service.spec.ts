/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApprenticeService } from './apprentice.service';

describe('Service: Apprentice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprenticeService]
    });
  });

  it('should ...', inject([ApprenticeService], (service: ApprenticeService) => {
    expect(service).toBeTruthy();
  }));
});
