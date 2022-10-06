import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApprenticeComponent } from './dashboard-apprentice.component';

describe('DashboardApprenticeComponent', () => {
  let component: DashboardApprenticeComponent;
  let fixture: ComponentFixture<DashboardApprenticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardApprenticeComponent ]
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
