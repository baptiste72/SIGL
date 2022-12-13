import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { NoteService } from 'src/app/services/note/note.service';

export interface Section {
  name: string;
  link: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: any;
  constructor(
    private router: Router,
    private noteService: NoteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getNotes();
  }

  public getNotes() {
    this.noteService
      .getNotesbyUserId(this.getUserId())
      .subscribe((response) => {
        this.notes = response;
      });
  }

  private getUserId(): number {
    return this.authService.userValue.id;
  }

  public goToNote(noteId: number) {
    this.router.navigate(['notes'], { state: { id: noteId } });
  }
}
