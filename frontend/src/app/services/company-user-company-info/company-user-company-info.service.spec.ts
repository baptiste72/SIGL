import { TestBed } from '@angular/core/testing';

import { CompanyUserCompanyInfoService } from './company-user-company-info.service';

describe('CompanyUserCompanyInfoService', () => {
  let service: CompanyUserCompanyInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUserCompanyInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
