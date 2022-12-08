import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TutorTeamService } from './tutor-team.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TutorTeamService', () => {
  let service: TutorTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TutorTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
