import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyEventPopupComponent } from './modify-event-popup.component';

describe('ModifyEventPopupComponent', () => {
  let component: ModifyEventPopupComponent;
  let fixture: ComponentFixture<ModifyEventPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyEventPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyEventPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
