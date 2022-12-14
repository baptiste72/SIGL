import { Role } from '@app/helpers';
import { YearGroup } from './YearGroup';

export class Apprentice {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  token?: string;
  yearGroup: YearGroup;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    yearGroup: YearGroup
  ) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.role = role;
    this.yearGroup = yearGroup;
  }
}
