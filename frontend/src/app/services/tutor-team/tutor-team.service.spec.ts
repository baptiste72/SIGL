import { TestBed } from '@angular/core/testing';

import { TutorTeamService } from './tutor-team.service';

describe('TutorTeamService', () => {
  let service: TutorTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
