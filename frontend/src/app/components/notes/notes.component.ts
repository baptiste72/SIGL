import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService} from 'src/app/services/note/note.service'

export interface Section {
  name: string;
  link: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {
  notes: any;
  constructor(
    private router: Router,
    private noteService: NoteService) {

  }

  ngOnInit(): void {

    this.getNotes();
    console.log(this.notes);
  }

  public getNotes() {
    this.noteService.getnotes().subscribe(response => {
      this.notes = response;
    });
  }

  public goToNote(noteId: number) {
    this.router.navigate(['notes'], { state: { id: noteId } });
  }

}
