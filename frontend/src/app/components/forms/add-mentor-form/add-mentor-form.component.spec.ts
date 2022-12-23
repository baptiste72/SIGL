import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorFormComponent } from './add-mentor-form.component';

describe('AddMentorFormComponent', () => {
  let component: AddMentorFormComponent;
  let fixture: ComponentFixture<AddMentorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMentorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMentorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
