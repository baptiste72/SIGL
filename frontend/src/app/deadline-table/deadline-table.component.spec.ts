import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeadlineTableComponent } from './deadline-table.component';

describe('DeadlineTableComponent', () => {
  let component: DeadlineTableComponent;
  let fixture: ComponentFixture<DeadlineTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadlineTableComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadlineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
