import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Apprentice } from '@app/models/Apprentice';
import { AuthService } from '@app/services';
import { map, Observable, startWith } from 'rxjs';
import { User } from 'src/app/models/User';
import { Role } from '@app/helpers';
import { FormControl } from '@angular/forms';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-select-apprentice',
  templateUrl: './select-apprentice.component.html',
  styleUrls: ['./select-apprentice.component.scss']
})
export class SelectApprenticeComponent implements OnInit {
  myControl = new FormControl<string | Apprentice>('');
  public user: User;
  readonly roleEnum = Role;
  filteredOptions: Observable<Apprentice[]> | undefined;
  public apprentices: Apprentice[] = [];
  @Output() apprenticeChangedEvent = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private apprenticeService: ApprenticeService,
    private _snackBar: MatSnackBar,
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit() {
    this.getApprentice();
  }

  displayFn(apprentice: Apprentice): string {
    return apprentice && apprentice.first_name
      ? apprentice.first_name + ' ' + apprentice.last_name
      : '';
  }

  private _filter(name: string): Apprentice[] {
    const filterValue = name.toLowerCase();

    return this.apprentices.filter(
      (option) =>
        option.first_name.toLowerCase().includes(filterValue) ||
        option.last_name.toLowerCase().includes(filterValue)
    );
  }

  private getApprentice() {
    this.apprenticeService.getAll().subscribe({
      next: (apprenticesData) => {
        this.apprentices = apprenticesData;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => {
            const name =
              typeof value === 'string'
                ? value
                : value?.first_name + '' + value?.last_name;
            return name
              ? this._filter(name as string)
              : this.apprentices.slice();
          })
        );
      },
      error: (err) => {
        this._snackBar.open(
          '❌ Une erreur est survenue lors de la récupération des apprentis',
          'Ok',
          {
            duration: 2000,
          }
        );
      },
    });
  }

  onApprenticeChanged(id: string): void {
    this.apprenticeChangedEvent.emit(id);
  }
}
