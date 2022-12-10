/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormationCenterService } from './formation-center.service';

describe('Service: FormationCenter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormationCenterService],
    });
  });

  it('should ...', inject(
    [FormationCenterService],
    (service: FormationCenterService) => {
      expect(service).toBeTruthy();
    }
  ));
});
