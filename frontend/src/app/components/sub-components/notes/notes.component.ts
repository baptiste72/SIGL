import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { AuthService } from '@app/services';
import { NoteService } from 'src/app/services/note/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { ConfirmDeleteComponent } from '@app/components/pop-up/confirm-delete/confirm-delete.component';
import { User } from 'src/app/models/User';
import { Role } from '@app/helpers';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { AddNotePopupComponent } from '../../pop-up/note/add-note-popup/add-note-popup.component';
import { UpdateNotePopupComponent } from '../../pop-up/note/update-note-popup/update-note-popup.component';

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
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnChanges {
  @Input() apprenticeId = '';
  public isAvailable = false;
  private notes: any;
  public note: any;
  public user: User;
  readonly roleEnum = Role;
  private userId;
  public treeData;
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
    private _snackBar: MatSnackBar,
    private apprenticeService: ApprenticeService
  ) {
    Object.keys(this.dataSource.data).forEach((x) => {
      this.setParent(this.dataSource.data[x], null);
    });

    this.userId = this.authService.userValue.id;
    this.user = this.authService.userValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];
      this.treeNotes(change.currentValue);
      this.note = {
        title: 'Affichage de la Note Périodique',
        text: 'Sélectionner une note',
        id: '',
        email: '',
      };
      if (history.state['id'] != undefined) {
        this.getNote(history.state['id']);
      }
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
    this.noteService.get(data).subscribe({
      next: (v) => {
        this.note = v;
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

  public treeNotes(userId: string) {
    this.noteService.treeNotes(userId).subscribe((response) => {
      this.treeData = response;
      this.dataSource.data = this.treeData;
      if (response.length === 0) {
        this.isAvailable = false;
      }
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
        if (result.event == 'ajout') {
          this.getNote(result.data.id);
        }
        this.treeNotes(this.userId.toString());
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
          this.isAvailable = false;
          this._snackBar.open('✔ La note a été supprimée', 'Ok', {
            duration: 2000,
          });
          this.treeNotes(this.userId.toString());
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
        this.treeNotes(this.userId.toString());
        this.getNote(this.note.id);
      });
  }
}
