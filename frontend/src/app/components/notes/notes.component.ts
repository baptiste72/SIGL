import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  notes: Section[] = [
    { name: 'Période 15 au 27 mai', link:"./notes" },
    { name: 'Période 28 au 05 juin', link:"./notes" },
    { name: 'Période 06 au 30 juin', link:"./notes" },
    { name: 'Période 03 au 15 août', link:"./notes" },
    { name: 'Période 16 au 27 août', link:"./notes" },
    { name: 'Période 01 au 12 septembre', link:"./notes" },
  ];
}
