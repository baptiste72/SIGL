import { Component,TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { AddNotePopupComponent } from '../../pop-up/add-note-popup/add-note-popup.component';

interface Note {
  name: string;
  children?: Note[];
}

const TREE_DATA: Note[] = [
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

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
})
export class NotesPageComponent {
  private _transformer = (node: Note, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  constructor(public dialog: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  openDialog() {
    this.dialog.open(AddNotePopupComponent,
      {
        width: '600px'
      }
    );
  }
}
