import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DashboardApprenticeComponent } from './dashboard-apprentice.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DashboardApprenticeComponent', () => {
  let component: DashboardApprenticeComponent;
  let fixture: ComponentFixture<DashboardApprenticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardApprenticeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardApprenticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
