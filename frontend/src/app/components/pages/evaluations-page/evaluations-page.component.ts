import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  templateUrl: './evaluations-page.component.html',
  styleUrls: ['./evaluations-page.component.scss']
})
export class EvaluationsPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'modify-time', 'modify-by', 'status', 'evaluation-name', 'note'];
  dataSource = new MatTableDataSource<Evaluation>(ELEMENT_DATA);
  @ViewChild('evaluationsPaginator') paginator :any = MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

export interface Evaluation {
  name: string;
  modifyTime: Date;
  modifyBy: string;
  status: string;
  evaluationName: string;
  note: number;
}

const ELEMENT_DATA: Evaluation[] = [
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
  {name: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'RENAUD Mathilde', status: 'Déposé', evaluationName: 'S7 - Fiche de synthèse', note: 15},
];
