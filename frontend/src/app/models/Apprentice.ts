import { Role } from '@app/helpers';

export class Apprentice {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: Role;
  token?: string;
  yearGroup_id: number;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    yearGroup_id: number
  ) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.role = role;
    this.yearGroup_id = yearGroup_id;
  }
}
