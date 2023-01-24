import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from '@app/helpers';
import { Apprentice } from '@app/models/Apprentice';
import { User } from '@app/models/User';
import { AuthService } from '@app/services';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  templateUrl: './dashboard-pedago.component.html',
  styleUrls: ['./dashboard-pedago.component.scss'],
})
export class DashboardPedagoComponent implements OnInit {
  myControl = new FormControl<string | Apprentice>('');
  public user: User;
  readonly roleEnum = Role;
  filteredOptions: Observable<Apprentice[]> | undefined;
  public apprentices: Apprentice[] = [];
  public hasLoaded: boolean = false;
  public apprenticeId = '';
  @Output() apprenticeChangedEvent = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private apprenticeService: ApprenticeService,
    private _snackBar: MatSnackBar
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
    if (this.user.role == this.roleEnum.TUTOR) {
      this.apprenticeService.getAllByTutorId(this.user.id).subscribe({
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
    } else if (this.user.role == this.roleEnum.MENTOR) {
      this.apprenticeService.getAllByMentorId(this.user.id).subscribe({
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
  }

  onApprenticeChanged(id: string): void {
    this.apprenticeId = id;
    this.hasLoaded = true;
  }
}
