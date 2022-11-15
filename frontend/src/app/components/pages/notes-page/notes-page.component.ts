import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AddNotePopupComponent } from '../../pop-up/add-note-popup/add-note-popup.component';
import { NoteService} from 'src/app/services/note/note.service'
import { MatSnackBar } from '@angular/material/snack-bar';
interface Note {
  id: any;
  name: string;
  children?: Note[];
}


/*
const treeData: Note[] = [
  {
    name: 'Semestre 5',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  },
  {
    name: 'Semestre 6',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  },
  {
    name: 'Semestre 7',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  },
  {
    name: 'Semestre 9',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  },
  {
    name: 'Semestre 9',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  },
  {
    name: 'Semestre 10',
    children: [{ name: '13 au 17 mai' }, { name: '27 au 15 juin' }, { name: '20 au 3 juillet' }],
  }
];
*/
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

constructor(public dialog: MatDialog, private noteService: NoteService ,private _snackBar: MatSnackBar) {
  Object.keys(this.dataSource.data).forEach(x => {
    this.setParent(this.dataSource.data[x], null);
  });

  }
  ngOnInit(): void {
    this.getNotes();
    this.treeNotes();
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
    console.log(data);
    this.noteService.getnote(data).subscribe({
    next: (v) => {
      this._snackBar.open(data, "Ok", { duration: 1000});
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
}
