import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NotesMinimalComponent } from './notes-minimal.component';

describe('NotesComponent', () => {
  let component: NotesMinimalComponent;
  let fixture: ComponentFixture<NotesMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesMinimalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
