import { TestBed } from '@angular/core/testing';

import { YearGroupService } from './year-group.service';

describe('YearGroupService', () => {
  let service: YearGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
