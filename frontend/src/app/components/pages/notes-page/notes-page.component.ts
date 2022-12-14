import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { AddNotePopupComponent } from '../../pop-up/note/add-note-popup/add-note-popup.component';
import { AuthService } from '@app/services';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateNotePopupComponent } from '../../pop-up/note/update-note-popup/update-note-popup.component';
import { lastValueFrom } from 'rxjs';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';

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
export class NotesPageComponent implements OnInit {
  isAvailable = false;
  notes: any;
  note: any;
  request: any;
  private userId;
  private treeData;
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
  hasNoContent = (_: number, node: ExampleFlatNode) => node.level === 1;

  constructor(
    private authService: AuthService,
    private confirmDeleteDialogRef: MatDialogRef<ConfirmDeleteComponent>,
    public dialog: MatDialog,
    private noteService: NoteService,
    private _snackBar: MatSnackBar
  ) {
    Object.keys(this.dataSource.data).forEach((x) => {
      this.setParent(this.dataSource.data[x], null);
    });

    this.userId = this.authService.userValue.id;
  }
  ngOnInit(): void {
    // Récupérer les notes en arborescence pour l'utilisateur
    this.treeNotes(this.userId);
    this.note = {
      title: 'Affichage de la Note Périodique',
      text: 'Sélectionner une note',
      id: '',
      email: '',
    };
    console.log(history.state);
    if (history.state['id'] != undefined) {
      this.getNote(history.state['id']);
    }
  }

  // Cette fonction parcourt l'arborescence des notes et définit les parents pour chaque noeud enfant
  setParent(data, parent) {
    data.parent = parent;
    if (data.children) {
      data.children.forEach((x) => {
        this.setParent(x, data);
      });
    }
  }

  public getNote(data: any) {
    this.isAvailable = true;
    console.log(data);
    this.noteService.get(data).subscribe({
      next: (v) => {
        this.note = v;
        console.log(this.note);
      },
      error: (err) => {
        this._snackBar.open('❌ Une erreur est survenue', 'Ok', {
          duration: 2000,
        });
      },
    });
  }

  public getNotes() {
    this.noteService.getAll().subscribe((response) => {
      this.notes = response;
    });
  }

  public treeNotes(userId: number) {
    this.noteService.treeNotes(userId).subscribe((response) => {
      this.treeData = response;
      this.dataSource.data = this.treeData;
    });
  }

  openDialog(note) {
    this.dialog
      .open(AddNotePopupComponent, {
        width: '1200px',
        data: {
          note: note,
          userId: this.userId,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(result);
        if (result.event == 'ajout') {
          this.getNote(result.data.id);
        }
        this.treeNotes(this.userId);
      });
  }

  public async openConfirmDeletePopup(content: string): Promise<boolean> {
    this.confirmDeleteDialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '600px',
    });

    this.confirmDeleteDialogRef.componentInstance.content = content;

    return await lastValueFrom(this.confirmDeleteDialogRef.afterClosed());
  }

  public async deleteNoteById(id: any) {
    const shouldDelete = await this.openConfirmDeletePopup(
      'Souhaitez-vous vraiment supprimer cet note ?'
    );
    if (shouldDelete) {
      this.noteService.delete(id).subscribe({
        next: (v) => {
          this.treeNotes(this.userId),
            (this.note = {
              title: 'Affichage de la Note Périodique',
              text: 'Sélectionner une note',
              id: '',
              email: '',
            });
        },
        error: (err) => {
          this._snackBar.open(
            "❌ Une erreur est survenue lors de la suppression de l'échéance",
            'Ok',
            { duration: 2000 }
          );
        },
      });
    }
  }

  openModifyDialog() {
    this.dialog
      .open(UpdateNotePopupComponent, {
        width: '1200px',
        data: {
          note: this.note,
          userId: this.userId,
        },
      })
      .afterClosed()
      .subscribe((shouldReload: boolean) => {
        this.treeNotes(this.userId);
        this.getNote(this.note.id);
      });
  }
}
