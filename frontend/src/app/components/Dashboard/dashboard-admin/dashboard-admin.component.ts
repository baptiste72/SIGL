import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Apprentice } from '@app/models/Apprentice';
import { ApprenticeService } from '@app/services/apprentice/apprentice.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  public apprentices: Apprentice[] = [];
  myControl = new FormControl<string | Apprentice>('');
  filteredOptions: Observable<Apprentice[]> | undefined;

  constructor(
    private apprenticeService: ApprenticeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getApprentice();
  }

  private _filter(name: string): Apprentice[] {
    const filterValue = name.toLowerCase();

    return this.apprentices.filter(
      (option) =>
        option.first_name.toLowerCase().includes(filterValue) ||
        option.last_name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(apprentice: Apprentice): string {
    return apprentice && apprentice.first_name
      ? apprentice.first_name + ' ' + apprentice.last_name
      : '';
  }

  // Récuparaiton des apprenties
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

  public showApprentice(userId: string) {

  }
}
