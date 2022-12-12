export class Company {
  id: number;
  worded: string;
  address: string;


  constructor(id: number, worded: string, address: string) {
    this.id = id;
    this.worded = worded;
    this.address = address;
  }
}
