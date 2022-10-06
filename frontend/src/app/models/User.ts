export class User {
    last_name: string;
    first_name: string;
    password: string;
    email: string;

    constructor(last_name: string, first_name: string, password: string, email: string) {
      this.last_name = last_name;
      this.first_name = first_name;
      this.password = password;
      this.email = email;
    }
  }


