import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
