import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['title', 'modify-time', 'modify-by', 'download-link'];
  dataSource = new MatTableDataSource<Evaluation>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface Evaluation {
  title: string;
  modifyTime: Date;
  modifyBy: string;
  downloadLink: string;
}

const ELEMENT_DATA: Evaluation[] = [
  {title: 'Grille évaluation S8', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Acquisition compétences', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Calendrier 2022-2023', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Date clés', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Grille évaluation S7', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Grille évaluation S8', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Acquisition compétences', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Calendrier 2022-2023', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
  {title: 'Fiche-de-synthese-S7', modifyTime: new Date('1/1/16'), modifyBy: 'MARGAS-LEROYER Julie', downloadLink: 'Déposé'},
];
