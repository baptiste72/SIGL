import { User } from './User';
import { YearGroup } from './YearGroup';

export class Document {
  id: number;
  name: string;
  file_name: string;
  yearGroup: YearGroup;
  user: User;

  constructor(
    id: number,
    name: string,
    file_name: string,
    user: User,
    yearGroup: YearGroup
  ) {
    this.id = id;
    this.name = name;
    this.file_name = file_name;
    this.user = user;
    this.yearGroup = yearGroup;
  }
}
