import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AddNotePopupComponent } from '../../pop-up/add-note-popup/add-note-popup.component';
import { DeleteNotePopupComponent } from '../../pop-up/delete-note-popup/delete-note-popup.component';

import { NoteService} from 'src/app/services/note/note.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModifyNotePopupComponent } from '../../pop-up/modify-note-popup/modify-note-popup.component';
import { ActivatedRoute, Router } from '@angular/router';
interface Note {
  id: any;
  name: string;
  children?: Note[];
}



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
}

@Component({
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent  implements OnInit {
  isAvailable = false;
  notes: any;
  note: any;
  request: any;
  private treeData
  private _transformer = (node: Note, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id: node.id,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  hasNoContent = (_: number, node: ExampleFlatNode) => node.level === 1;

constructor(
  private route: ActivatedRoute,
  public dialog: MatDialog,
  private noteService: NoteService,
  private _snackBar: MatSnackBar) {
    Object.keys(this.dataSource.data).forEach(x => {
    this.setParent(this.dataSource.data[x], null);
  });

  }
  ngOnInit(): void {
    this.treeNotes();
    this.note = {
      title : 'Affichage de la Note Périodique',
      text : 'Sélectionner une note',
      id : '',
      email :''
    };
    console.log(history.state);
    this.route.data.subscribe(data => {
      this.getNote(history.state["id"]);
    });
  }

  setParent(data, parent) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach(x => {
        this.setParent(x, data);
      });
    }
  }


  public getNote(data: any,) {
    this.isAvailable = true;
    console.log(data);
    this.noteService.getnote(data).subscribe({
    next: (v) => {
      this.note = (v);
      console.log(this.note);
    },
    error: (err) => {
      this._snackBar.open("❌ Une erreur est survenue", "Ok", { duration: 2000})
    }
  });
  }


  public getNotes() {
    this.noteService.getnotes().subscribe(response => {
      this.notes = response;
    });
}

  public treeNotes() {
    this.noteService.treenotes().subscribe(response => {
      this.treeData = response;
      this.dataSource.data = this.treeData;
    });
  }


  openDialog() {
    this.dialog.open(AddNotePopupComponent,
      {
        width: '1200px'
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.treeNotes()
    });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteNotePopupComponent,
      {
        width: '550px',
        data: {
          dataKey: this.note.id,
        }
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.treeNotes()
    });
  }

  openModifyDialog() {
    this.dialog.open(ModifyNotePopupComponent,
      {
        width: '1200px',
        data: {
          dataKey: this.note,
        }
      }
    ).afterClosed()
    .subscribe((shouldReload: boolean) => {
      this.treeNotes()
    });
  }

}
