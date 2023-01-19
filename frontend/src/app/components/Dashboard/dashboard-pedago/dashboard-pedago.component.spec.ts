import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPedagoComponent } from './dashboard-pedago.component';

describe('DashboardPedagoComponent', () => {
  let component: DashboardPedagoComponent;
  let fixture: ComponentFixture<DashboardPedagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPedagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPedagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
