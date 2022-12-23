import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApprenticeFormComponent } from './add-apprentice-form.component';

describe('AddApprenticeFormComponent', () => {
  let component: AddApprenticeFormComponent;
  let fixture: ComponentFixture<AddApprenticeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApprenticeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApprenticeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
