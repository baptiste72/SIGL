export class User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;

  constructor(id: number, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
  }
}


