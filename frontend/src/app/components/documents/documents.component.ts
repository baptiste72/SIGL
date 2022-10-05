import { Component, OnInit } from '@angular/core';

export interface Section {
  name: string;
  link: string;
}

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  documents: Section[] = [
    { name: 'Dates clés', link:"./documents" },
    { name: 'Calendrier 2022-2023', link:"./documents" },
    { name: 'Acquisition compétences', link:"./documents" },
    { name: 'Grille évaluation S6', link:"./documents" },
    { name: 'Grille évaluation S7', link:"./documents" },
    { name: 'Grille évaluation S8', link:"./documents" },
  ];
}
