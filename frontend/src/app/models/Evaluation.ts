import { User } from './User';
import { YearGroup } from './YearGroup';

export class Evaluation {
  id: number;
  file_name: string;
  modification_date: Date;
  status: string;
  type: string;
  note: number;
  user: User;
  yearGroup: YearGroup;

  constructor(
    id: number,
    file_name: string,
    modification_date: Date,
    status: string,
    type: string,
    note: number,
    user: User,
    yearGroup: YearGroup,
  ) {
    this.id = id;
    this.file_name = file_name;
    this.modification_date = modification_date;
    this.status = status;
    this.type = type;
    this.note = note;
    this.user = user;
    this.yearGroup = yearGroup;
  }
}
